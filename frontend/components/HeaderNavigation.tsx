'use client'

import Image from 'next/image'
import { FaUser } from 'react-icons/fa6'
import { useTranslations } from 'next-intl'
import { AiOutlineMenu } from 'react-icons/ai'
import { useCallback, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import routes from '@/routes'
import useUser from '@/hooks/useUser'
import { classnames } from '@/futils'
import { useAppStore } from '@/store/provider'
import useTopOffset from '@/hooks/useTopOffset'
import { Link, useRouter } from '@/i18n/routing'
import Popover from '@/components/common/Popover'
import LoadingSpinner from '@/icons/LoadingSpinner'
import Container from '@/components/common/Container'
import LanguageNavSelector from '@/components/language/LanguageNavSelector'
import OperatingCountrySelector from '@/components/OperatingCountrySelector'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'
import getSpecialOffersContentAction from '@/actions/cms/getSpecialOffersContentAction'

const ProfileLink = () => {
  const { getProfile } = useUser()

  const {
    user: { userData },
    operatingCountry: { activeId },
  } = useAppStore((state) => state)

  const { isPending } = useQuery({
    queryFn: getProfile,
    queryKey: ['getProfile', activeId],
  })

  const label = userData ? userData.first_name : 'Verify Account'

  return (
    <Link
      prefetch
      href={routes.user.profile}
      className={classnames(
        'flex items-center gap-2 overflow-hidden text-nowrap duration-1000',
        isPending ? 'max-w-8' : 'max-w-52',
        !userData && 'text-secondary'
      )}
    >
      {isPending ? (
        <LoadingSpinner className="p-0.5" />
      ) : (
        <>
          <FaUser
            className={classnames('min-w-3.5', userData && 'text-primary')}
          />
          {label}
        </>
      )}
    </Link>
  )
}
const AuthButton = () => {
  const {
    setAuth: { setIsAuthModalOpen },
  } = useAppStore((state) => state)
  const t = useTranslations()

  const showAuthModal = () => setIsAuthModalOpen(true)

  return (
    <div className="flex h-10 items-center gap-1 rounded-lg bg-white/60 px-4 py-1 shadow-md shadow-primary/10">
      <button onClick={showAuthModal} type="button">
        {t('Register')}
      </button>
      /
      <button onClick={showAuthModal} type="button">
        {t('Login')}
      </button>
    </div>
  )
}
type HeaderNavigationProps = {
  isLoggedIn: boolean
  activeLanguage: string
  activeCountry: GetOperatingCountriesData
}

const HeaderNavigation = ({
  isLoggedIn,
  activeCountry,
  activeLanguage,
}: HeaderNavigationProps) => {
  const t = useTranslations()

  const router = useRouter()
  const { offset } = useTopOffset()

  const {
    ui: { navLinks },
    setAuth: { setIsLoggedIn },
    setUi: { setNavLinks, setIsNavigationDrawerActive },
  } = useAppStore((state) => state)

  const addSpecialLinkInNav = useCallback(async () => {
    const res = await getSpecialOffersContentAction()

    if (res.success) {
      const navItems = res.data.map(({ state_name }) => ({
        text: state_name,
        link: routes.specialOffersByState(state_name),
      }))

      if (navItems.length > 0)
        setNavLinks({ 'Special Offers': navItems, ...navLinks })
    }
  }, [setNavLinks])

  useEffect(() => {
    setIsLoggedIn(isLoggedIn)
  }, [setIsLoggedIn, isLoggedIn])

  useEffect(() => {
    addSpecialLinkInNav()
  }, [addSpecialLinkInNav])

  return (
    <div
      className={classnames(
        'duration-300',
        offset > 100 ? 'bg-white/90 py-2 md:py-1' : 'bg-white py-4'
      )}
    >
      <Container className="!py-0 font-normal">
        <div className="flex items-center justify-between gap-4">
          <Link prefetch href={routes.home}>
            <Image
              width={200}
              height={100}
              alt="AutoRent"
              src="/assets/images/logo.svg"
              className={classnames(
                'h-full w-full object-contain duration-300',
                offset > 100 ? 'max-w-28' : 'max-w-28 md:max-w-40'
              )}
            />
          </Link>
          <nav className="align hidden h-14 items-center gap-4 text-black md:flex">
            {Object.keys(navLinks).map((key) => (
              <Popover
                key={key}
                label={
                  <span
                    className={classnames(
                      'relative',
                      key === 'Special Offers' &&
                        'rounded-lg bg-gradient-to-r from-primary to-secondary px-3 py-2 text-white'
                    )}
                  >
                    {key === 'Special Offers' ? (
                      <span className="badge-blinking absolute left-[-10px] top-[-10px] size-5 animate-ping"></span>
                    ) : null}
                    {t(key)}
                  </span>
                }
                isHoverEnable
                buttonClassName="h-24"
                onClick={() =>
                  key === 'Special Offers' && router.push(routes.specialOffers)
                }
                className={classnames(
                  'min-w-28 rounded-b-lg border-t-2 border-t-primary',
                  offset > 100 ? '-mt-6 bg-white/90' : '-mt-3 bg-white'
                )}
                dialogs={navLinks[key].map(({ link, text }) => (
                  <Link
                    prefetch
                    key={text}
                    href={link}
                    className="duration-150 hover:text-primary"
                  >
                    {t(text)}
                  </Link>
                ))}
              />
            ))}

            <OperatingCountrySelector activeCountry={activeCountry} />

            <LanguageNavSelector
              activeLanguage={activeLanguage}
              languages={activeCountry.languages}
            />

            {isLoggedIn ? <ProfileLink /> : <AuthButton />}
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            {isLoggedIn ? <ProfileLink /> : <AuthButton />}

            <button
              onClick={() => setIsNavigationDrawerActive(true)}
              type="button"
              className="h-10 rounded-lg bg-white/10 px-4 py-1 text-2xl shadow duration-150"
            >
              <AiOutlineMenu />
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default HeaderNavigation
