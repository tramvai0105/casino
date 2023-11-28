import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Header from './ui/header'
import { FlexCol } from './utils/flex'
import Spacer from './ui/spacer';
import SessionProvider from "./lib/sessionProvider";
import { getServerSession } from 'next-auth'

const inter = Roboto({ subsets: ['latin'], weight: "400" })

export const metadata: Metadata = {
  title: 'Gold Pig Casino',
  description: 'PigBox cases and more',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={"text-white " + inter.className}>
        <SessionProvider session={session}>
          <FlexCol className='gap-4'>
            <Header />
            <Spacer size={41} />
            {children}
          </FlexCol>
        </SessionProvider>
      </body>
    </html>
  )
}
