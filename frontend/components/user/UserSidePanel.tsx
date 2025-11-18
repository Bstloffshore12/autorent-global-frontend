'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import useUser from '@/hooks/useUser'
import { classnames } from '@/futils'
import Button from '@/components/common/Button'
import useTopOffset from '@/hooks/useTopOffset'

const Links = [
  { link: routes.user.profile, text: 'Profile' },
  { link: routes.user.support, text: 'Support' },
  // { link: routes.user.security, text: 'Security' },
  // { link: routes.user.myInvoices, text: 'My Invoices' },
  { link: routes.user.bookings, text: 'My Bookings' },
  // { link: routes.user.myAddresses, text: 'My Addresses' },
  // { link: routes.user.inviteFrends, text: 'Invite Frends' },
]

const Li = ({ text, link }: { text: string; link: string }) => {
  const t = useTranslations()

  const pathname = usePathname()

  return (
    <li>
      <Link
        className={classnames(
          'block rounded-lg py-2 font-medium duration-150 hover:text-primary md:px-4',
          pathname === link
            ? 'bg-primary-light text-primary'
            : 'text-neutral-500'
        )}
        href={link}
      >
        {t(text)}
      </Link>
    </li>
  )
}

const UserSidePanel = () => {
  const t = useTranslations()

  const { onLogOut } = useUser()
  const { offset } = useTopOffset()
  const { mutate, isPending } = useMutation({ mutationFn: onLogOut })

  return (
    <aside>
      <nav className="sticky top-0 md:pt-8">
        <ul
          className="duration-500"
          style={{ marginTop: offset > 115 ? '40px' : '' }}
        >
          {Links.map(({ link, text }) => (
            <Li key={text} link={link} text={text} />
          ))}
        </ul>

        <div className="mt-2 border-t border-primary-light pt-4 md:mx-4">
          <Button
            size="small"
            className="w-full"
            theme="primaryLight"
            isPending={isPending}
            isDisabled={isPending}
            onPress={() => mutate()}
          >
            {t('Log Out')}
          </Button>
        </div>
      </nav>
    </aside>
  )
}

export default UserSidePanel
