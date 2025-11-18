'use client'

import { IoLanguage } from 'react-icons/io5'

import { classnames } from '@/futils'
import useLanguage from '@/hooks/useLanguage'
import useTopOffset from '@/hooks/useTopOffset'
import Popover from '@/components/common/Popover'
import { type Language } from '@/model/LanguageModel'

interface LanguageNavSelector {
  languages: Language[]
  activeLanguage: string
}

const LanguageNavSelector = ({
  languages,
  activeLanguage,
}: LanguageNavSelector) => {
  const { offset } = useTopOffset()

  const { onLanguageChange } = useLanguage({ languages, activeLanguage })

  if (languages.length < 2) return null

  return (
    <Popover
      isHoverEnable
      buttonClassName="h-24"
      dialogClassName="!space-y-0"
      label={<IoLanguage className="text-lg" />}
      className={classnames(
        'overflow-hidden rounded-b-lg border-t-2 border-t-primary !p-0',
        offset > 100 ? '-mt-6 bg-white/90' : '-mt-3 bg-white'
      )}
      dialogs={languages.map(({ id, title, slug }) => (
        <button
          key={id}
          onClick={() => onLanguageChange({ slug, name: title })}
          className={classnames(
            'px-4 py-1 duration-150',
            activeLanguage === slug
              ? 'bg-primary text-white'
              : 'hover:bg-primary-light hover:text-primary'
          )}
        >
          {title}
        </button>
      ))}
    />
  )
}

export default LanguageNavSelector
