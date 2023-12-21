import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import RegisterModal from './components/RegisterModal'
import './globals.css'
import ToasterProvider from './Providers/ToasterProvider'

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
        <RegisterModal/>
        <ToasterProvider/>
        <Navbar />
        {/* </ClientOnly> */}
        {children}
      </body>
    </html>
  )
}
