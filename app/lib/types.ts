export type Case = {
    caseId: string,
    name: string,
    price: number,
    image: string,
    describe: string,
    items?: {id: string, prob?: number}[]
}

export type Item = {
    itemId: string,
    name: string,
    price: number,
    image: string,
    describe: string,
    rarity: string,
}
