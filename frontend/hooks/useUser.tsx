import { toast } from 'react-toastify'

import routes from '@/routes'
import { toastErrors } from '@/futils'
import { useRouter } from '@/i18n/routing'
import { useAppStore } from '@/store/provider'
import logOutAction from '@/actions/auth/logOutAction'
import getProfileAction from '@/actions/user/getProfileAction'
import postProfileAction from '@/actions/user/postProfileAction'

interface PostProfileProps {
  phone: string
  lastName: string
  firstName: string
}

const useUser = () => {
  const router = useRouter()

  const {
    user: { userData },
    setAuth: { resetAuth },
    setUser: { resetUser, setUserData, setIsVerified },
  } = useAppStore((state) => state)

  const restUser = async () => {
    const res = await logOutAction()

    if (res.success) {
      resetUser()
      resetAuth()
    }

    return res
  }

  const onLogOut = async () => {
    const res = await restUser()

    if (!res.success) return toastErrors(res.errors)

    router.push(routes.home)
    return toast.success(res.message)
  }

  const getProfile = async () => {
    const res = await getProfileAction()

    if (res.message === 'Unauthenticated.') {
      await restUser()
      return null
    }

    if (!res.success) {
      toastErrors(res.errors)
      return null
    }

    setUserData(res.data)
    setIsVerified(!!res.data.email_verified_at)
    return res.data
  }

  const postProfile = async ({
    phone,
    lastName,
    firstName,
  }: PostProfileProps) => {
    const res = await postProfileAction({
      phone,
      last_name: lastName,
      first_name: firstName,
    })

    if (res.success) toast.success(res.message)
    else toastErrors(res.errors)

    return null
  }

  const getProfileCompletionPercentage = () => {
    if (!userData) return 0

    let fields = [
      userData.city,
      userData.phone,
      userData.email,
      userData.state,
      userData.address,
      userData.country,
      userData.last_name,
      userData.first_name,
      userData.postal_code,
      userData.license_back,
      userData.license_front,
      userData.license_place,
      userData.license_number,
      userData.license_expiry,
    ]

    if (userData.visa_status === 'resident') {
      fields = [
        ...fields,
        userData.emirates_id,
        userData.resident_back,
        userData.resident_place,
        userData.resident_front,
        userData.resident_expiry,
      ]
    } else if (userData.visa_status === 'visit') {
      fields = [
        ...fields,

        userData.passport,
        userData.passport_place,
        userData.passport_number,
        userData.passport_expiry,
      ]
    }

    const filledFields = fields.filter((field) => field)

    return Math.round((filledFields.length / fields.length) * 100)
  }

  return {
    onLogOut,
    getProfile,
    postProfile,
    getProfileCompletionPercentage,
  }
}

export default useUser
