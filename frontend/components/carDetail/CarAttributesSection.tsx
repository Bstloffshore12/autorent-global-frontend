import { GoGear } from 'react-icons/go'
import { FaRegMap } from 'react-icons/fa6'
import { type IconType } from 'react-icons'
import { useTranslations } from 'next-intl'
import { BiShapeCircle } from 'react-icons/bi'
import { PiCylinder, PiSeat } from 'react-icons/pi'
import { LuCalendar1, LuFuel } from 'react-icons/lu'
import { AiOutlineFileProtect } from 'react-icons/ai'
import { IoEyedropOutline, IoCarSportOutline } from 'react-icons/io5'
import { MdOutlineDoorBack, MdOutlineEventNote } from 'react-icons/md'

const OverViewElement = ({
  name,
  text,
  Icon,
}: {
  name: string
  text: string
  Icon: IconType
}) => {
  return (
    <p className="grid grid-cols-[160px_auto]">
      <span className="flex items-center gap-2">
        <Icon />
        {name}
      </span>
      <span className="font-medium text-black">{text}</span>
    </p>
  )
}

type CarAttributesSectionProps = {
  make: string
  door: string
  seat: string
  year: string
  model: string
  color: string
  warranty: string
  bodyType: string
  fuelType: string
  cylinder: string
  transmission: string
  bodyCondition: string
  regionalSpecification: string
}
const CarAttributesSection = ({
  make,
  door,
  seat,
  year,
  color,
  model,
  warranty,
  bodyType,
  fuelType,
  cylinder,
  transmission,
  bodyCondition,
  regionalSpecification,
}: CarAttributesSectionProps) => {
  const t = useTranslations()

  return (
    <div className="space-y-2">
      <div className="grid gap-2 md:grid-cols-2">
        <OverViewElement
          text={make}
          name={t('Make')}
          Icon={IoCarSportOutline}
        />
        <OverViewElement
          text={model}
          name={t('Model')}
          Icon={IoCarSportOutline}
        />
        <OverViewElement
          Icon={GoGear}
          name={t('Transmission')}
          text={transmission}
        />
        <OverViewElement name={t('Year')} text={year} Icon={LuCalendar1} />
        <OverViewElement
          text={warranty}
          name={t('Warranty')}
          Icon={AiOutlineFileProtect}
        />
        <OverViewElement
          Icon={FaRegMap}
          name={t('Specification')}
          text={regionalSpecification}
        />
        <OverViewElement
          text={bodyType}
          name={t('Body Type')}
          Icon={BiShapeCircle}
        />
        <OverViewElement Icon={LuFuel} text={fuelType} name={t('Fuel Type')} />
        <OverViewElement
          name={t('Cylinder')}
          text={cylinder}
          Icon={PiCylinder}
        />
        <OverViewElement
          name={t('Color')}
          text={color}
          Icon={IoEyedropOutline}
        />
        <OverViewElement
          text={door}
          name={t('Doors')}
          Icon={MdOutlineDoorBack}
        />
        <OverViewElement Icon={PiSeat} name={t('Seats')} text={seat} />
      </div>
      <OverViewElement
        text={bodyCondition}
        Icon={MdOutlineEventNote}
        name={t('Body Condition')}
      />
    </div>
  )
}

export default CarAttributesSection
