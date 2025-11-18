const CreditCardLock = ({
  width = '48',
  height = '48',
  className,
}: {
  width?: string
  height?: string
  className?: string
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      className={className}
    >
      <path d="M46 48H2a2 2 0 0 1-2-2V20a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v26a2 2 0 0 1-2 2zM2 20v26h44V20z" />
      <path d="M12 20H6a1 1 0 0 1-1-1v-8A11 11 0 0 1 16 0h16a11 11 0 0 1 11 11v3a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2a4 4 0 0 0-4-4H17a4 4 0 0 0-4 4v7a1 1 0 0 1-1 1zm-5-2h4v-6a6 6 0 0 1 6-6h14a6 6 0 0 1 6 6v1h4v-2a9 9 0 0 0-9-9H16a9 9 0 0 0-9 9zM16 43H8a1 1 0 0 1-.79-.38 1 1 0 0 1-.21-.86l1.53-6.14a5 5 0 1 1 6.88 0L17 41.76a1 1 0 0 1-.18.86A1 1 0 0 1 16 43zm-6.72-2h5.44l-1.38-5.5a1 1 0 0 1 .39-1.06 3 3 0 1 0-3.46 0 1 1 0 0 1 .39 1.06z" />
      <path d="M47 33H19v-2h27v-5H2v5h3v2H1a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h46a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1zM42 43H32a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1zm-9-2h8v-3h-8zM19 36h2v2h-2zM23 36h2v2h-2zM27 36h2v2h-2zM19 41h8v2h-8z" />
    </svg>
  )
}

export default CreditCardLock
