import 'server-only'

import { cookies } from 'next/headers'

export type LanguageSlug = 'ar' | 'en'

export interface Language {
  id: number
  slug: string
  title: string
}

class LanguageModel {
  static slugKey = 'lang'
  static languages: LanguageSlug[] = ['en', 'ar']
  static default = this.languages[0]

  static checkIsValid = (lang: string = '') =>
    this.languages.includes(lang as LanguageSlug)

  static getActive = async () => {
    const cookieStore = await cookies()
    return cookieStore.get(this.slugKey)?.value
  }

  static setLanguage = async (language: string) => {
    const cookieStore = await cookies()

    if (this.checkIsValid(language)) {
      cookieStore.set(this.slugKey, language)
      return language
    }

    cookieStore.set(this.slugKey, this.default)
    return this.default
  }
}

export default LanguageModel
