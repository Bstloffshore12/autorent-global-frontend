'use server'

import LanguageModel from '@/model/LanguageModel'

const setLanguageAction = async (language: string): Promise<string> => {
  return LanguageModel.setLanguage(language.toString())
}

export default setLanguageAction
