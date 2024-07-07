export const TabsCustume = ({state, setState, tabs, className = ""}) => {
    return (
        <>
            <div className={"w-[300px]  " + className}>
                <div className="rounded-xl mt-4 flex py-2.5 px-2 gap-4  relative items-center border border-[#7E7E7E]">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            onClick={() => setState(tab.state)}
                            className={`w-full cursor-pointer flex justify-center ${state === tab.state ? "bg-[#544BF0]" : "bg-[#F9F9FB]"} rounded-[8px] h-10`}>
                            <div className={`flex items-center ${state === tab.state?'text-white':'text-[#6C7593]'}`} >
                                {tab.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
