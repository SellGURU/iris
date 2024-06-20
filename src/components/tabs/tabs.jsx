export const TabsCustume = ({state, setState}) => {
    return (
        <>
            <div className={"w-[300px]"}>
                <div className="mx-8 shadow rounded-full h-10 mt-4 flex p-1 relative items-center">
                    <div
                        className={`w-full flex justify-center ${state !== "one" ? "bg-[#544BF0] text-white" : ""} rounded-full h-full `}>

                        <button onClick={() => {
                            setState("multi")
                        }}>All poses
                        </button>
                    </div>
                    <div
                        className={`w-full flex justify-center ${state === "one" ? " bg-[#544BF0] text-white " : ""} rounded-full h-full `}>
                        <button onClick={() => {
                            setState("one")
                        }}>One poses
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};
