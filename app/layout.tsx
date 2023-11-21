import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import Header from './ui/header'
import { FlexCol } from './utils/flex'
import Spacer from './ui/spacer';

const inter = Raleway({ subsets: ['latin'], weight: "500" })

export const metadata: Metadata = {
  title: 'Gold Pig Casino',
  description: 'PigBox cases and more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"text-white " + inter.className}>
        <FlexCol className='gap-4 px-[10%]'>
          <Header/>
          <Spacer size={41}/>
          {children}
        </FlexCol>
      </body>
    </html>
  )
}
