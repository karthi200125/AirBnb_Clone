import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/GetCurrentUser'
import RentModal from './components/modals/RentModal'

export const metadata: Metadata = {
  title: 'AirBnb',
  description: 'Airbnb clone',
}

const font = Nunito({ subsets: ["latin"] })

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const CurrentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <ClientOnly> */}
        <RegisterModal />
        <LoginModal />
        <RentModal/>
        <Toaster />
        <Navbar CurrentUser={CurrentUser} />
        {/* </ClientOnly> */}
        {children}
      </body>
    </html>
  )
}
