import { FaHome } from 'react-icons/fa'
import { BiChevronRight } from 'react-icons/bi'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/routing'
import Container from '@/components/common/Container'

interface BreadcrumbProps {
  path: {
    name: string
    link?: string
  }[]
}

const Breadcrumb = async ({ path }: BreadcrumbProps) => {
  const t = await getTranslations()

  return (
    <div className="border-b border-neutral-200">
      <Container>
        <div className="flex flex-wrap items-center gap-1 text-sm font-normal text-neutral-400">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <FaHome />
            {t('Home')}
          </Link>
          {path.map(({ name, link }) => (
            <div key={name} className="flex items-center gap-1">
              <BiChevronRight size={18} />
              <Link
                href={link || '#'}
                className="duration-300 hover:text-primary"
              >
                {name}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Breadcrumb
