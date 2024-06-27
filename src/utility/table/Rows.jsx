const Rows=[
    {
        accessorKey: 'date',
        header: 'data',
        cell: ({row}) => {
            return (
                <div className="flex items-center justify-start gap-4">
                    <img
                        className="w-10 h-10 border rounded-full"
                        src={row.original.imageSrc}
                        alt={`${row.original.patient} image`}
                    />
                    <div className="">
                        <div className="font-semibold text-nowrap">{row.original.patient}</div>
                    </div>
                    <Link to={row.original.externalLink}>
                        <FiExternalLink/>
                    </Link>
                </div>
            );
        },
    },
]


// date
//     :
//     "2024-06-24"
// errorThreshold
//     :
//     10
// id
//     :
//     ""
// sex
//     :
//     "masculine"