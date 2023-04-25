import Image from 'next/image'
import icon from '@/assets/logo.svg'

export const Header = () => {
  return (
    <header className='bg-cinza-700 h-200 flex items-center justify-center leading-normal font-bold text-[40px]'>
      <Image
        className='mr-2'
        src={icon}
        alt='logo'
        height={22}
        width={36}
      />
      <span className='text-blue'>to</span>
      <span className='text-purple-dark'>do</span>
    </header>
  )
}
