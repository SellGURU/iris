export const TabsCustume = ({state, setState, tabs, className = ""}) => {
    return (
        <>
            <div className={"w-[300px]  " + className}>
                <div className=" shadow rounded-[8px] h-12 mt-4 flex p-1 relative items-center">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            onClick={() => setState(tab.state)}
                            className={`w-full flex justify-center ${state === tab.state ? "bg-[#544BF0] text-white" : ""} rounded-[8px] h-full`}>
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
