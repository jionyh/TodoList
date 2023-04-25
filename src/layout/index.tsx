import styles from './Layout.module.css'
import { ReactElement } from 'react'
import { Header } from '@/components/Header'

type Props = {
  children: ReactElement
}
export const Layout = ({ children }: Props) => {
  return (
    <div className=''>
      <Header />
      <main className='flex-1'>{children}</main>
      {/* <footer className='h-14 bg-teal-200 flex justify-center items-center bg'>Footer</footer> */}
    </div>
  )
}
