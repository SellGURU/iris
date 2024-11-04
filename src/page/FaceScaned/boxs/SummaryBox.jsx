import Status from "./Status"

/* eslint-disable react/prop-types */
const SummaryBox =({data}) => {
    return (
        <>
            <div className="flex flex-col">
            <p>{data.title}</p>
            <p className="text-[#7E7E7E] text-[14px] mt-2 decorated-dot">
                Description: {data.description}
            </p>
            <div className="flex flex-row items-center mt-4 justify-between w-full">
                <p className="decorated-dot ">
                    {data.Measurement!= '' ?
                    <>
                        Measurement: {data.Measurement}
                    </>
                    :
                    <>
                        Left-to-Right Symmetry: {data['Left-to-Right Symmetry']}
                    </>
                    }
                </p>
                <Status status={data.status}></Status>
            </div>
            </div>        
        </>
    )
}

export default SummaryBox