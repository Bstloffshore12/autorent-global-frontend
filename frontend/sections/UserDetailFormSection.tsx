'use client'

import { useState } from 'react'
import { type Key } from 'react-aria-components'

import { classnames } from '@/futils'
import { type UserData } from '@/model/UserModel'
import LicenseForm from '@/components/user/LicenseForm'
import { type Option } from '@/components/common/Select'
import PassportForm from '@/components/user/PassportForm'
import ResidentialForm from '@/components/user/ResidentialForm'
import ResidenceIdForm from '@/components/user/ResidenceIdForm'

type UserDetailFormSectionProps = {
  countries: Option[]
  userProfile: UserData
}

const UserDetailFormSection = ({
  countries,
  userProfile,
}: UserDetailFormSectionProps) => {
  const [visaStatus, setVisaStatus] = useState<Key>(
    userProfile?.visa_status || ''
  )
  return (
    <div className="space-y-8">
      <ResidentialForm
        countries={countries}
        visaStatus={visaStatus}
        userProfile={userProfile}
        setVisaStatus={setVisaStatus}
      />
      <PassportForm
        countries={countries}
        userProfile={userProfile}
        className={classnames(visaStatus === 'resident' && 'hidden')}
      />
      <ResidenceIdForm
        countries={countries}
        userProfile={userProfile}
        className={classnames(visaStatus === 'visit' && 'hidden')}
      />
      <LicenseForm countries={countries} userProfile={userProfile} />
    </div>
  )
}

export default UserDetailFormSection
