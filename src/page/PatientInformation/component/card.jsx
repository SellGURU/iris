export const CardPatient = ({className,children}) => {
    return (
        <div className={"w-fit rounded-xl flex items-start gap-5 justify-center flex-col shadow-xl px-6 py-4 "+className}>
            {children}
        </div>
    )
}
