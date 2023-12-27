import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import getCurrentUser from './actions/GetCurrentUser'
import Navbar from './components/Navbar/Navbar'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'
import './globals.css'

export const metadata: Metadata = {
  title: 'AirBnb ',
  description: 'Airbnb clone',
}

const font = Nunito({ subsets: ["latin"] })

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const CurrentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>        
          <RegisterModal />
          <LoginModal />
          <SearchModal />
          <RentModal />
          <Toaster />
          <Navbar CurrentUser={CurrentUser} />        
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
