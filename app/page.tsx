import Image from 'next/image'
import CaseSection from './ui/caseSection'
import Spacer from './ui/spacer'
import { FlexCol } from './utils/flex'

export default function Home() {
  return (
    <FlexCol className='w-full'>
      <Spacer size={80}/>
      <CaseSection name='Стандарт' nameClasses='text-[22px] px-6'>123</CaseSection>
    </FlexCol>
  )
}
