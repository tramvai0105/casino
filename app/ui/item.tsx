import Image from 'next/image';
import { FlexCol } from '../utils/flex';
import clsx from 'clsx';
export default function ItemElement({ id, name, image, price, describe, onClick, describeOn = true, rarity = "common" }: { id: string, name: string, image: string, price: number, describe: string, onClick?: () => void, describeOn?: boolean, rarity?: string }) {


    return (
        <div onClick={onClick} className='relative h-fit min-w-[168px] max-w-[168px]'>
            <FlexCol className={clsx({'from-[#304384]':(rarity == "common" || rarity == null), 'from-[#6D2545]':(rarity == "rare"), 'from-[#8F6424]':(rarity == "legend")},
            {'before:bg-[#3E63DD]':(rarity == "common" || rarity == null), 'before:bg-[#E93D82]':(rarity == "rare"), 'before:bg-[#FFC53D]':(rarity == "legend")},
            'to-[#141726] bg-gradient-to-b rounded-xl p-1 before:-translate-y-[100%] before:w-[80%] before:h-[4px] before:rounded-lg')}>
                <span className='px-2 text-[18px] text-center whitespace-nowrap'>{(name.length > 12) ? `${name.toLocaleUpperCase().slice(0, 12)}...` : `${name.toLocaleUpperCase().slice(0, 12)}`}</span>
                <Image className='max-h-[150px] p-1 w-auto max-w-[170px]' width={170} height={150} src={`/${image}`} alt={`${name}'s image`} />
            </FlexCol>
            {describeOn
                ?
                <FlexCol className='h-full opacity-0 hover:opacity-100 transition-opacity duration-300 pt-6 gap-3 -translate-y-[100%] w-full absolute bg-[#141726] bg-opacity-90'>
                    <span className='px-2 text-[18px] text-center'>{name}</span>
                    <span>Цена: {price}</span>
                    <span className='text-center'>{describe}</span>
                </FlexCol>
                : <></>}
        </div>
    )
}