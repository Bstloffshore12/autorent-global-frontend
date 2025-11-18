'use client'

import { useTranslations } from 'next-intl'
import { Form } from 'react-aria-components'
import { BiSolidEditAlt } from 'react-icons/bi'
import { useState, type FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'

import useUser from '@/hooks/useUser'
import { classnames } from '@/futils'
import Button from '@/components/common/Button'
import { type UserData } from '@/model/UserModel'
import InputField from '@/components/common/InputField'
import SectionHeading from '@/components/common/SectionHeading'
import ProfileFormStatusIndecator from '@/components/user/ProfileFormStatusIndecator'

type PersonalInformationFormProps = {
  userProfile: UserData
}

const PersonalInformationForm = ({
  userProfile,
}: PersonalInformationFormProps) => {
  const t = useTranslations()

  const { postProfile } = useUser()

  const [isEditable, setIsEditable] = useState(false)
  const [phone, setPhone] = useState(userProfile?.phone || '')
  const [lastName, setLastName] = useState(userProfile?.last_name || '')
  const [firstName, setFirstName] = useState(userProfile?.first_name || '')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    return postProfile({ phone, lastName, firstName })
  }

  const { mutate, isPending } = useMutation({ mutationFn: onSubmit })

  return (
    <Form
      onSubmit={mutate}
      className="space-y-4 rounded-lg border border-primary-light p-6 shadow-md shadow-primary/10"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SectionHeading className="!text-2xl">
            {t('Personal Information')}
          </SectionHeading>

          <ProfileFormStatusIndecator isConpleted isVisible={isEditable} />
        </div>
        <Button
          size="small"
          theme="primaryLight"
          onPress={() => setIsEditable(!isEditable)}
          className={classnames(
            '!min-w-0 overflow-hidden',
            isEditable ? 'w-36' : 'w-24'
          )}
        >
          <BiSolidEditAlt /> {isEditable ? t('Cancel Edit') : t('Edit')}
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          isRequired
          value={firstName}
          label={t('First Name')}
          onChange={setFirstName}
          isDisabled={!isEditable}
          placeholder={t('First Name')}
        />
        <InputField
          isRequired
          value={lastName}
          label={t('Last Name')}
          onChange={setLastName}
          isDisabled={!isEditable}
          placeholder={t('Last Name')}
        />
        <InputField
          isRequired
          value={phone}
          label={t('Phone')}
          onChange={setPhone}
          isDisabled={!isEditable}
          placeholder={t('Phone')}
        />
        <InputField
          isDisabled
          isRequired
          label={t('Email')}
          placeholder={t('Email')}
          value={userProfile?.email}
        />
      </div>

      <Button
        type="submit"
        theme="primary"
        isPending={isPending}
        isDisabled={!isEditable || isPending}
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

export default PersonalInformationForm
