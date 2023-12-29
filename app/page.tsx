import Image from 'next/image'
import CaseSection from './ui/caseSection'
import Spacer from './ui/spacer'
import { FlexCol } from './utils/flex'
import { Case, Item } from './lib/types';
import fs from 'fs';
import CaseElement from './ui/case';
import Link from 'next/link';
import { SuBaDB } from './lib/sb';

export default async function Home() {

  let cases = await SuBaDB().getCases()
  
  return (
    <FlexCol className='w-full'>
      <Spacer size={80} />
      <CaseSection className='flex border-b-[2px] border-[#363A3F] flex-wrap px-[5%]' name='Стандарт' nameClasses='text-[26px]'>
        {cases.map((item, i) =>
        <Link href={`/case/${item.caseId}`}>
          <CaseElement
            key={i}
            id={item.caseId}
            name={item.name}
            image={item.image}
            price={item.price}
            describe={item.describe}
          />
        </Link>)}
      </CaseSection>
    </FlexCol>
  )
}
