import { redirect } from 'next/navigation'

import routes from '@/routes'
import { countriesToSelectOptions } from '@/futils'
import getCountriesAction from '@/actions/getCountriesAction'
import getProfileAction from '@/actions/user/getProfileAction'
import VerifyEmailForm from '@/components/user/VerifyEmailForm'
import UserDetailFormSection from '@/sections/UserDetailFormSection'
import PersonalInformationForm from '@/components/user/PersonalInformationForm'
import ProfileCompletionStatus from '@/components/user/ProfileCompletionStatus'

const ProfilePage = async () => {
  const [getProfileRes, getCountriesRes] = await Promise.all([
    getProfileAction(),
    getCountriesAction(),
  ])

  if (!getProfileRes.success && getProfileRes.status === 400)
    return <VerifyEmailForm />

  if (getProfileRes.success && getProfileRes.data) {
    const userProfile = getProfileRes.data

    const countries = getCountriesRes.success
      ? countriesToSelectOptions(getCountriesRes.data)
      : []

    return (
      <div className="space-y-8">
        <ProfileCompletionStatus />
        <PersonalInformationForm userProfile={userProfile} />
        <UserDetailFormSection
          countries={countries}
          userProfile={userProfile}
        />
      </div>
    )
  }

  redirect(routes.home)
}

export default ProfilePage
