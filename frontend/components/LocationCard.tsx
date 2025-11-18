import { FiMail, FiPhone } from 'react-icons/fi'

import { Link } from '@/i18n/routing'
import { classnames } from '@/futils'
import Card from '@/components/common/Card'
import { type OfficeLocationData } from '@/model/CmsModel'

interface LocationCardProps extends OfficeLocationData {
  className?: string
}

const LocationCard = ({
  id,
  fax,
  city,
  title,
  email,
  phone,
  address,
  mapframe,
  className,
}: LocationCardProps) => {
  const uniqueId = `${city}-${id}-${title}`

  return (
    <Card
      id={uniqueId.replaceAll(' ', '-')}
      className={classnames(
        'grid !p-0 shadow sm:grid-cols-[240px_auto]',
        className
      )}
    >
      <iframe
        title={title}
        loading="lazy"
        src={mapframe}
        className="h-60 w-full sm:w-60"
      />

      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-semibold capitalize">{city}</p>
            <span className="block h-4 border-r border-neutral-200" />

            <p className="font-medium text-primary">{title}</p>
          </div>
        </div>
        <h3 className="text-lg font-medium duration-300 hover:text-primary">
          <Link href="/">{address}</Link>
        </h3>
        <div className="grid gap-2">
          {phone && (
            <a
              href="tel:+"
              className="flex items-center gap-1 duration-300 hover:text-primary"
            >
              <FiPhone /> {phone}
            </a>
          )}
          {fax && (
            <a
              href="tel:+"
              className="flex items-center gap-1 duration-300 hover:text-primary"
            >
              <FiPhone />
              {fax}
            </a>
          )}
          {email && (
            <a
              href="mailto:"
              className="flex items-center gap-1 duration-300 hover:text-primary"
            >
              <FiMail />
              {email}
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}

export default LocationCard
