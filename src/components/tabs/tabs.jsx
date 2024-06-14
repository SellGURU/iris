export const TabsCustume = ({setState}) => {

    return (
        <>
            <div className={"w-[300px]"}>
                <div className="mx-8 shadow rounded-full h-10 mt-4 flex p-1 relative items-center">
                    <div className="w-full flex justify-center">
                        <button>Left</button>
                    </div>
                    <div className="w-full flex justify-center">
                        <button>Right</button>
                    </div>
                    <span
                        className="elSwitch bg-indigo-600 shadow text-white flex items-center justify-center w-1/2 rounded-full h-8 transition-all top-[4px] absolute left-1 ">
                        Text
                    </span>
                </div>
            </div>
        </>
    );
};
