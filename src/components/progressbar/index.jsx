export const ProgressbarCustom = ({Percent = "0",className}) => {
    return (
        <div className={"w-5/6 bg-white rounded-full h-5  text-white "+className}>
            <div className="bg-blue-600 h-full rounded-full text-right flex items-center py-2 justify-end pr-1 text-white " style={{width:`${Percent}%`}}>{Percent}%</div>
        </div>
    )
}
