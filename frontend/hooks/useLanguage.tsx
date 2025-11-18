import { IoLanguage } from 'react-icons/io5'
import { useCallback, useEffect } from 'react'

import { useAppStore } from '@/store/provider'
import type { Key } from 'react-aria-components'
import { type Language } from '@/model/LanguageModel'
import setLanguageAction from '@/actions/language/setLanguageAction'

const loadingMessage = 'Please wait while we update your language preference'

interface UseLanguageProps {
  languages: Language[]
  activeLanguage: string
}

const useLanguage = ({ languages, activeLanguage }: UseLanguageProps) => {
  const { setLoadingModel, resetLoadingModel } = useAppStore(
    (state) => state.setUi
  )

  const onLanguageChange = useCallback(
    async ({ slug, name }: { slug: Key; name: string }) => {
      setLoadingModel({
        isActive: true,
        title: `Loading | ${name} | Language`,
        subtitle: `Changing language to ${name}`,
        children: <p className="mt-2 text-lg">{loadingMessage}</p>,
        icon: <IoLanguage className="mx-auto text-6xl text-primary" />,
      })
      await setLanguageAction(slug.toString())
    },
    [setLoadingModel]
  )

  useEffect(() => {
    if (!languages.map(({ slug }) => slug).includes(activeLanguage)) {
      onLanguageChange({ name: 'English', slug: 'en' })
    } else {
      const active = languages.find(({ slug }) => slug === activeLanguage)

      setLoadingModel({
        isActive: false,
        title: `Loading | ${active?.title || ''} | Language`,
        subtitle: `Changing language to ${active?.title || ''}`,
        children: <p className="mt-2 text-lg">{loadingMessage}</p>,
        icon: <IoLanguage className="mx-auto text-6xl text-primary" />,
      })

      setTimeout(() => {
        resetLoadingModel()
      }, 350)
    }
  }, [
    languages,
    activeLanguage,
    setLoadingModel,
    onLanguageChange,
    resetLoadingModel,
  ])

  return { onLanguageChange }
}

export default useLanguage
