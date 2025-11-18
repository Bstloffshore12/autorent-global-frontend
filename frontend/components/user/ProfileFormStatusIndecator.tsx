import { MdPending } from 'react-icons/md'
import { FaCheckCircle } from 'react-icons/fa'

import { classnames } from '@/futils'
import Chip from '@/components/common/Chip'

interface ProfileFormStatusIndecator {
  isVisible: boolean
  isConpleted: boolean
}

const ProfileFormStatusIndecator = ({
  isVisible,
  isConpleted,
}: ProfileFormStatusIndecator) => {
  return (
    <Chip
      className={classnames(
        'flex items-center gap-1 overflow-hidden whitespace-nowrap duration-300',
        isVisible
          ? 'max-w-0 !px-0 opacity-0'
          : 'max-w-32 !px-1 opacity-100 md:px-2',

        isConpleted ? '' : '!bg-secondary'
      )}
    >
      {isConpleted ? <FaCheckCircle /> : <MdPending />}
      <span className="hidden md:block">
        {isConpleted ? 'Completed' : 'Not Completed'}
      </span>
    </Chip>
  )
}

export default ProfileFormStatusIndecator
