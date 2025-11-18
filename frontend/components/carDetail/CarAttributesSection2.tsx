import { GoGear } from 'react-icons/go'
import { FaRegMap } from 'react-icons/fa6'
import { type IconType } from 'react-icons'
import { BiShapeCircle } from 'react-icons/bi'
import { getTranslations } from 'next-intl/server'
import { IoCarSportOutline } from 'react-icons/io5'
import { PiCylinder, PiSeat } from 'react-icons/pi'
import { LuCalendar1, LuFuel } from 'react-icons/lu'
import { AiOutlineFileProtect } from 'react-icons/ai'
import { MdOutlineDoorBack, MdOutlineEventNote } from 'react-icons/md'

type OverViewElementProps = {
  text: string
  name?: string
  Icon: IconType
}

const OverViewElement = ({ name, text, Icon }: OverViewElementProps) => {
  return (
    <span className="flex items-center gap-1">
      <Icon />
      {name && <span>{name}</span>}
      <span>{text}</span>
    </span>
  )
}

type CarAttributesSection2Props = {
  make?: string
  door?: string
  seat?: string
  year?: string
  model?: string
  color?: string
  warranty?: string
  bodyType?: string
  fuelType?: string
  cylinder?: string
  transmission?: string
  bodyCondition?: string
  regionalSpecification?: string
}
const CarAttributesSection2 = async ({
  make,
  door,
  seat,
  year,
  model,
  warranty,
  bodyType,
  fuelType,
  cylinder,
  transmission,
  bodyCondition,
  regionalSpecification,
}: CarAttributesSection2Props) => {
  const t = await getTranslations()

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {make && <OverViewElement text={make} Icon={IoCarSportOutline} />}
      {model && <OverViewElement text={model} Icon={IoCarSportOutline} />}
      {transmission && <OverViewElement text={transmission} Icon={GoGear} />}
      {year && (
        <OverViewElement text={year} Icon={LuCalendar1} name={t('Year')} />
      )}
      {warranty && (
        <OverViewElement
          text={warranty}
          name={t('Warranty')}
          Icon={AiOutlineFileProtect}
        />
      )}
      {regionalSpecification && (
        <OverViewElement
          Icon={FaRegMap}
          name={t('Specification')}
          text={regionalSpecification}
        />
      )}
      {bodyType && <OverViewElement text={bodyType} Icon={BiShapeCircle} />}
      {fuelType && <OverViewElement text={fuelType} Icon={LuFuel} />}
      {cylinder && (
        <OverViewElement
          text={cylinder}
          Icon={PiCylinder}
          name={t('Cylinder')}
        />
      )}
      {door && (
        <OverViewElement
          text={door}
          name={t('Doors')}
          Icon={MdOutlineDoorBack}
        />
      )}
      {seat && <OverViewElement text={seat} Icon={PiSeat} name={t('Seats')} />}
      {bodyCondition && (
        <OverViewElement text={bodyCondition} Icon={MdOutlineEventNote} />
      )}
    </div>
  )
}

export default CarAttributesSection2
