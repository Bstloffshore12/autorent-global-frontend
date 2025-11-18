'server only'

import { cookies } from 'next/headers'

import NetworkModel from '@/model/NetworkModel'

export type SignUpProps = {
  phone: string
  email: string
  password: string
  last_name: string
  first_name: string
  c_password: string
}

export type LogInProps = {
  email: string
  password: string
  remember_me: boolean
}

type CreateSessionProp = {
  token: string
  expiresAt: string
}

export type GetOtpProps = {
  email: string
}

export type VerifyOtpProps = {
  email: string
  token: string
}

export type VerifyEmailProps = {
  token: string
}

export type ResetPasswordProps = {
  email: string
  password: string
  c_password: string
}

class AuthModel {
  static login = async (data: LogInProps) => {
    return NetworkModel.fetch(NetworkModel.apiRoutes.auth.login, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static signUp = async (data: SignUpProps) => {
    return NetworkModel.fetch(NetworkModel.apiRoutes.auth.signUp, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static getOtp = async (data: GetOtpProps) => {
    return NetworkModel.fetch(NetworkModel.apiRoutes.auth.getOtp, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static resetPassword = async (data: ResetPasswordProps) => {
    return NetworkModel.fetch(NetworkModel.apiRoutes.auth.resetPassword, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static verifyOtp = async (data: VerifyOtpProps) => {
    return NetworkModel.fetch(NetworkModel.apiRoutes.auth.verifyOtp, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static verifyEmail = async (data: VerifyEmailProps) => {
    return NetworkModel.fetch(NetworkModel.apiRoutes.auth.verifyEmail, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static resendOtp = async () => {
    return NetworkModel.fetch(NetworkModel.apiRoutes.auth.resendOtp, {
      method: 'POST',
    })
  }

  static logOut = async () => {
    return NetworkModel.fetch(NetworkModel.apiRoutes.auth.logOut, {
      method: 'POST',
    })
  }

  static getAuthToken = async () => {
    return (await cookies()).get('token')?.value
  }

  static getAuthorizationHeader = async () => {
    const authToken = await this.getAuthToken()

    return {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    }
  }

  static createSession = async ({ token, expiresAt }: CreateSessionProp) => {
    const cookieStore = await cookies()

    cookieStore.set('token', token, {
      path: '/',
      secure: false,
      httpOnly: false,
      sameSite: 'lax',
      expires: new Date(expiresAt),
    })
  }

  static deleteSession = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('token')
  }
}

export default AuthModel
