export const TabsCustume = ({state, setState, tabs, className = ""}) => {
    return (
        <>
            <div className={"w-[300px]  " + className}>
                <div className=" shadow rounded-full h-10 mt-4 flex p-1 relative items-center">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`w-full flex justify-center ${state === tab.state ? "bg-[#544BF0] text-white" : ""} rounded-full h-full`}>
                            <div className="flex items-center" onClick={() => setState(tab.state)}>
                                {tab.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
