export const TabsCustume = ({state, setState, tabs, className = ""}) => {
    return (
        <>
            <div className={"w-[300px]  " + className}>
                <div className="rounded-xl mt-4 flex py-2.5 px-2 gap-4  relative items-center border border-black">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`w-full cursor-pointer flex justify-center ${state === tab.state ? "bg-[#544BF0] text-white" : "bg-[#f6f6fb]"} rounded-xl py-2`}>
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
