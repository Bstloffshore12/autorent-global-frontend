'use client'

import useLanguage from '@/hooks/useLanguage'
import Button from '@/components/common/Button'
import { type Language } from '@/model/LanguageModel'

interface LanguageButtonSelectorProps {
  languages: Language[]
  activeLanguage: string
}

const LanguageButtonSelector = ({
  languages,
  activeLanguage,
}: LanguageButtonSelectorProps) => {
  const { onLanguageChange } = useLanguage({ languages, activeLanguage })

  if (languages.length < 2) return null

  return (
    <div className="flex gap-2">
      {languages.map(({ id, title, slug }) => (
        <Button
          key={id}
          theme={activeLanguage === slug ? 'primary' : 'primaryLight'}
          onPress={() => onLanguageChange({ slug, name: title })}
          className="flex-1"
        >
          {title}
        </Button>
      ))}
    </div>
  )
}

export default LanguageButtonSelector
