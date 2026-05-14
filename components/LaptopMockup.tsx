import Image from 'next/image'

interface Props {
  size?: 'lg' | 'sm'
}

export default function LaptopMockup({ size = 'lg' }: Props) {
  // Sizes tuned so the screen is prominent and the base bleeds off the bottom
  const width = size === 'lg' ? 620 : 420

  return (
    <Image
      src="/images/txns-laptop.png"
      alt="Design preview"
      width={800}
      height={552}
      style={{
        width,
        height: 'auto',
        objectFit: 'contain',
        display: 'block',
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.55))',
        flexShrink: 0,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    />
  )
}
