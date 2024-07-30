export const ProgressbarCustom = ({percent,className}) => {

    return (
        <div style={{background:"rgba(255, 255, 255, 0.5)"}} className={"w-5/6 absolute bottom-6 gap-10 bg-[] p-3 rounded-md h-auto flex justify-between items-center "}>
            <div className={"w-2/6 bg-white rounded-md text-white border-white border-4 px-1" + className}>
                <div
                    className={`${percent.front?"bg-blue-600 text-white ":" bg-white border border-red-500 text-red-500 "} text-left h-full w-full rounded-md flex items-center justify-start pl-1`}>
                    1.Front
                </div>
            </div>
            <div className={"w-2/6 bg-white rounded-md text-white border-white border-4 px-1" + className}>
                <div
                    className={`${percent.left?"bg-blue-600 text-white ":" bg-white border border-red-500 text-red-500 "} text-left h-full w-full rounded-md flex items-center justify-start pl-1`}>
                    2.Right
                </div>
            </div>
            <div className={"w-2/6 bg-white rounded-md text-white border-white border-4 px-1" + className}>
                <div
                    className={`${percent.right?"bg-blue-600 text-white ":" bg-white border border-red-500 text-red-500 "} text-left h-full w-full rounded-md flex items-center justify-start pl-1`}>
                    3.left
                </div>
            </div>
        </div>

    )
}
