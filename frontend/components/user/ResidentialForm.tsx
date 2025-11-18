'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { BiSolidEditAlt } from 'react-icons/bi'
import { useMutation } from '@tanstack/react-query'
import { Form, type Key } from 'react-aria-components'
import { useState, useEffect, type FormEvent } from 'react'

import useUser from '@/hooks/useUser'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import { type UserData } from '@/model/UserModel'
import { classnames, toastErrors } from '@/futils'
import Checkbox from '@/components/common/Checkbox'
import InputField from '@/components/common/InputField'
import SectionHeading from '@/components/common/SectionHeading'
import Dropdown, { type Option } from '@/components/common/Select'
import postProfileDetailsAction from '@/actions/user/postProfileDetailsAction'
import ProfileFormStatusIndecator from '@/components/user/ProfileFormStatusIndecator'

type ResidentialFormProps = {
  visaStatus: Key
  countries: Option[]
  userProfile: UserData
  setVisaStatus: (keys: Key) => void
}

const ResidentialForm = ({
  countries,
  visaStatus,
  userProfile,
  setVisaStatus,
}: ResidentialFormProps) => {
  const t = useTranslations()

  const visaStatusOprtions = [
    { id: 'visit', title: t('Visit') },
    { id: 'resident', title: t('Resident') },
  ]

  const { getProfile } = useUser()

  const { operatingCountry } = useAppStore((state) => state)

  const [countryName, setCountryName] = useState('')
  const [isEditable, setIsEditable] = useState(false)
  const [city, setCity] = useState(userProfile?.city || '')
  const [state, setState] = useState(userProfile?.state || '')
  const [address, setAddress] = useState(userProfile?.address || '')
  const [country, setCountry] = useState<Key>(userProfile?.country || '')
  const [postalCode, setPostalCode] = useState(userProfile?.postal_code || '')
  const [newsletter, setNewsletter] = useState(
    !!userProfile?.newsletter || false
  )
  const [validCreditCard, setValidCreditCard] = useState(
    !!userProfile?.valid_cc || false
  )

  const preparePayload = () => {
    const fields = {
      city,
      state,
      address,
      terms: '1',
      valid_age: '1',
      valid_visa: '1',
      valid_license: '1',
      postal_code: postalCode,
      country: country.toString(),
      visa_status: visaStatus.toString(),
      newsletter: newsletter ? '1' : '0',
      valid_cc: validCreditCard ? '1' : '0',
    }

    const files = new FormData()

    return { fields, files }
  }

  const updateProfileDetails = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = preparePayload()
    const res = await postProfileDetailsAction(payload)

    if (res.success) {
      const data = await getProfile()

      if (data) {
        setIsEditable(false)
      }

      toast.success(res.message)
    } else toastErrors(res.errors)
  }

  const { mutate, isPending: isProfileUpdating } = useMutation({
    mutationFn: updateProfileDetails,
  })

  useEffect(() => {
    const activeCountry = operatingCountry.list.find(
      (x) => x.id === operatingCountry.activeId
    )

    setCountryName(activeCountry?.name || '')
  }, [operatingCountry.activeId, operatingCountry.list])

  const isConpleted = !!(
    city &&
    state &&
    address &&
    country &&
    postalCode &&
    countryName
  )

  return (
    <Form
      onSubmit={mutate}
      className="space-y-4 rounded-lg border border-primary-light p-6 shadow-md shadow-primary/10"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SectionHeading className="!text-2xl">
            {t('Personal Details')}
          </SectionHeading>

          <ProfileFormStatusIndecator
            isVisible={isEditable}
            isConpleted={isConpleted}
          />
        </div>

        <Button
          size="small"
          theme="primaryLight"
          className={classnames(
            '!min-w-0 overflow-hidden',
            isEditable ? 'w-36' : 'w-24'
          )}
          onPress={() => setIsEditable(!isEditable)}
        >
          <BiSolidEditAlt /> {isEditable ? t('Cancel Edit') : t('Edit')}
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Dropdown
          bordered
          isRequired
          options={countries}
          label={t('Country')}
          selectedKeys={country}
          isDisabled={!isEditable}
          placeholder={t('Country')}
          onSelectionChange={setCountry}
        />
        <InputField
          // isRequired
          value={state}
          label={t('State')}
          onChange={setState}
          placeholder={t('State')}
          isDisabled={!isEditable}
        />
        <InputField
          isRequired
          value={city}
          label={t('City')}
          onChange={setCity}
          placeholder={t('City')}
          isDisabled={!isEditable}
        />

        <InputField
          isRequired
          value={address}
          label={t('Address')}
          onChange={setAddress}
          isDisabled={!isEditable}
          placeholder={t('Address')}
        />
        <InputField
          isRequired
          value={postalCode}
          label={t('Postal Code')}
          isDisabled={!isEditable}
          onChange={setPostalCode}
          placeholder={t('Postal Code')}
        />
        <Dropdown
          isRequired
          bordered
          label={t('Visa Status')}
          isDisabled={!isEditable}
          selectedKeys={visaStatus}
          options={visaStatusOprtions}
          placeholder={t('Visa Status')}
          onSelectionChange={setVisaStatus}
        />
      </div>

      <div className="space-y-2">
        <Checkbox
          isDisabled
          isSelected
          label={`I have a valid Driving License (For ${countryName} Residents) or International Driving License (For Tourists)`}
        />
        <Checkbox
          isDisabled
          isSelected
          label={t(
            'I have an Residence ID or Valid Passport with the visa entry stamp'
          )}
        />
        <Checkbox
          isDisabled={!isEditable}
          isSelected={validCreditCard}
          onChange={setValidCreditCard}
          label={t('I have a valid Credit Card')}
        />
        <Checkbox
          isDisabled
          isSelected
          label={t("Driver's age is above 21 years")}
        />
        <Checkbox
          isSelected={newsletter}
          onChange={setNewsletter}
          isDisabled={!isEditable}
          label={t(
            "Sign up to the Autorent email newsletter and we'll keep you informed of our latest offers"
          )}
        />
        <Checkbox
          isDisabled
          isSelected
          label={`${t('I accept the terms & conditions')} *`}
        />
      </div>
      <Button
        type="submit"
        theme="primary"
        isPending={isProfileUpdating}
        isDisabled={isProfileUpdating}
        className={classnames(
          'mx-auto !mt-8 block overflow-hidden',
          isEditable ? '!h-10 !opacity-100' : '!h-0 !opacity-0'
        )}
      >
        {t('Update Profile')}
      </Button>
    </Form>
  )
}

export default ResidentialForm
