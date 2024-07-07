export const TabsCustume = ({state, setState, tabs, className = ""}) => {
    return (
        <>
            <div className={"w-[300px]  " + className}>
                <div className="rounded-xl mt-4 flex py-2.5 px-2 gap-4  relative items-center border border-black">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            onClick={() => setState(tab.state)}
                            className={`w-full flex justify-center ${state === tab.state ? "bg-[#544BF0] text-white" : ""} rounded-[8px] h-10`}>
                            <div className="flex items-center" >
                                {tab.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
