'use client'

import {
  FaTiktok,
  FaYoutube,
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaSquareInstagram,
} from 'react-icons/fa6'
import { type IconType } from 'react-icons'
import { useEffect, useState } from 'react'

import { classnames } from '@/futils'
import { useAppStore } from '@/store/provider'

interface BlockProps {
  link: string
  label: string
  Icon: IconType
  className?: string
}

const Block = ({ Icon, label, link, className }: BlockProps) => {
  return (
    <a
      href={link}
      title={`${label} Link`}
      aria-label={`${label} Link`}
      className={classnames(
        'flex size-10 items-center justify-center rounded-lg border border-neutral-200 text-lg shadow duration-300 hover:border-primary hover:bg-primary hover:text-white',
        className
      )}
    >
      <Icon />
    </a>
  )
}

export type SocialLinksType = {
  x: string
  tiktok: string
  youtube: string
  facebook: string
  linkedIn: string
  instagram: string
}

type SocialLInkBlocksProps = {
  className?: string
  containerClassName?: string
  socialLinks?: SocialLinksType
}

const SocialLInkBlocks = ({
  className,
  socialLinks,
  containerClassName,
}: SocialLInkBlocksProps) => {
  const {
    general: { socialLinks: storeSocialLinks },
    setGeneral: { serSocialLinks },
  } = useAppStore((state) => state)

  const [x, setX] = useState(socialLinks?.x || '')
  const [tiktok, setTiktok] = useState(socialLinks?.tiktok || '')
  const [youtube, setYoutube] = useState(socialLinks?.youtube || '')
  const [facebook, setFacebook] = useState(socialLinks?.facebook || '')
  const [linkedIn, setLinkedin] = useState(socialLinks?.linkedIn || '')
  const [instagram, setInstagram] = useState(socialLinks?.instagram || '')

  useEffect(() => {
    if (socialLinks) serSocialLinks(socialLinks)
  }, [socialLinks, serSocialLinks])

  useEffect(() => {
    setX(storeSocialLinks.x)
    setTiktok(storeSocialLinks.tiktok)
    setYoutube(storeSocialLinks.youtube)
    setFacebook(storeSocialLinks.facebook)
    setLinkedin(storeSocialLinks.linkedIn)
    setInstagram(storeSocialLinks.instagram)
  }, [storeSocialLinks])

  return (
    <div className={classnames('flex gap-2', containerClassName)}>
      {facebook && (
        <Block
          Icon={FaFacebookF}
          className={className}
          link={facebook}
          label="facebook"
        />
      )}
      {instagram && (
        <Block
          Icon={FaSquareInstagram}
          className={className}
          link={instagram}
          label="instagram"
        />
      )}
      {youtube && (
        <Block
          Icon={FaYoutube}
          className={className}
          link={youtube}
          label="youtube"
        />
      )}
      {x && (
        <Block link={x} label="x" className={className} Icon={FaXTwitter} />
      )}
      {tiktok && (
        <Block
          Icon={FaTiktok}
          className={className}
          link={tiktok}
          label="tiktok"
        />
      )}
      {linkedIn && (
        <Block
          Icon={FaLinkedinIn}
          className={className}
          link={linkedIn}
          label="linkedIn"
        />
      )}
    </div>
  )
}

export default SocialLInkBlocks
