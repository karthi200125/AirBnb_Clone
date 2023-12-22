import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import LoginModal from './components/modals/LoginModal'

export const metadata: Metadata = {
  title: 'AirBnb',
  description: 'Airbnb clone',
}

const font = Nunito({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <ClientOnly> */}
        <RegisterModal />
        <LoginModal />
        <Toaster />
        <Navbar />
        {/* </ClientOnly> */}
        {children}
      </body>
    </html>
  )
}
