import PageHeading from '@/components/common/PageHeading'

type ContentAreaProps = {
  title: string
  subtitle: string
}

const ContentArea = ({ title, subtitle }: ContentAreaProps) => {
  return (
    <>
      <PageHeading>{title}</PageHeading>
      {subtitle && <p>{subtitle}</p>}
    </>
  )
}

export default ContentArea
