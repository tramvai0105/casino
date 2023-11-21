export function FlexRow({
    children,
    className,
    itemsCenter = true,
  }: {
    children: React.ReactNode,
    className?: string,
    itemsCenter?: boolean,
  }){
    return(
        <div className={"flex flex-row " + className + " " + ((itemsCenter)?"items-center ":" ")}>
            {children}
        </div>
    )
}

export function FlexCol({
    children,
    className,
    itemsCenter = true,
  }: {
    children: React.ReactNode,
    className?: string,
    itemsCenter?: boolean,
  }){
    return(
        <div className={"flex flex-col " + className + " " + ((itemsCenter)?"items-center ":" ")}>
            {children}
        </div>
    )
}