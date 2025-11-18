'use client'

const PaymentTestComp = ({ link }: { link: string }) => {
  return (
    <div>
      {link && <iframe className="h-96 w-full border" src={link}></iframe>}
    </div>
  )
}

export default PaymentTestComp
