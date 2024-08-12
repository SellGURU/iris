import ButtonPrimary from "../../components/button/buttonPrimery.jsx";
import {PaymentTable} from "./paymentTable.jsx";
import {PaymentCard} from "./paymentCard.jsx";
import PaymentMethod from "./paymentMethod.jsx";
import {PatientContext} from '../../context/context.jsx'
import { useContext, useEffect, useState } from "react";
import Package from "../../model/Package.js";
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import PackageApi from '../../api/package.js';
import { useLocalStorage } from "@uidotdev/usehooks";

export const PaymentHistory = () => {
    const appContext = useContext(PatientContext)
    // console.log(appContext.package.getPackage())
    const navigate = useNavigate()
    let [localPartyId,] = useLocalStorage("partyid");
    let [localEmail,] = useLocalStorage("email")    
    useEffect(() => {
        PackageApi.getPackages().then((res) => {
            console.log(res)
            const resolved =res.data.USD.map(el => {
                // console.log(JSON.parse(el.subs_info_data))
                return new Package({
                    name:el.display_name,
                    cycle:el.sub_period,
                    cost:el.sd_price,
                    useage:0,
                    bundle:el.allowed_scans,
                    discount:el.sdiscount,
                    options:[]                       
                })
            })
            console.log(resolved)
        })
    })
    const packages = [
        new Package({
            name:'Individual',
            cycle:'Yearly',
            cost:10,
            useage:0,
            bundle:1 ,
            discount:'0',
            subCode:"+sPwwWEH4syZZdnvq5k/jA==",
            subprice_code:"+sPwwWEH4syZZdnvq5k/jA==",
            options:[
                "1 Scan",
                "Use Within 12 Months",
                ""
            ]           
        }),
        new Package({
            name:'Essential',
            cycle:'Yearly',
            cost:375,
            useage:0,
            bundle:50,
            discount:'25' ,
            oldCost:'500',
            subCode:"cKdL+SBoIZT8thdWlpB6Xg==",
            subprice_code:"cKdL+SBoIZT8thdWlpB6Xg==",            
            options:[
                "$8 Per Scan",
                "50 Scan Bundle",
                "Use Within 12 Months"
            ]
        }),
        new Package({
            name:'Pro',
            cycle:'Yearly',
            cost:600,
            useage:0,
            bundle:100,
            discount:'40',
            oldCost:'1000',
            subCode:"jrF6+co9GsoMxmC6FK+xLw==",
            subprice_code:"jrF6+co9GsoMxmC6FK+xLw==",              
            options:[
                "$6 Per Scan",
                "100 Scan Bundle",
                "Use Within 12 Months"
            ]                      
        }),
        new Package({
            name:'Unlimited',
            cycle:'Yearly',
            cost:5000,
            useage:0,
            bundle:1000,
            discount:'50',
            oldCost:'10000',
            subCode:"gFXhS/ruHAPbiz0k0SPN3w==",
            subprice_code:"gFXhS/ruHAPbiz0k0SPN3w==",             
            options:[
                "$5 Per Scan",
                "1000 Scan Bundle",
                "Use Within 12 Months"
            ]              
        })                              
    ]
    const [showMoreautoPlay,setSHowMoreAutoPlay] = useState(false)
    return (
        <div className={"flex gap-5 items-center justify-center px-16  flex-col"}>
            <div className="px-0  w-full flex justify-start">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover"  className="text-primary-color" href="/">
                        Home
                    </Link>
                    <Link underline="hover"  className="text-primary-color" href="/#/faceCamera">
                        Face Scanner
                    </Link>                    
                    <Typography className="text-primary-color" >Payment</Typography>
                </Breadcrumbs>                

            </div>      
            <h1 className={"text-3xl font-medium"}>Payment History</h1>
            <p className={"text-lg font-normal"}>You can view your orders, payments, cards, and current package status here.</p>
            <div className={"w-full"}>
                <div>
                    <div className={"block lg:flex w-full flex-col md:flex-row  gap-10 items-start justify-between"}>
                        <div className={" w-full mb-8 lg:mb-0 relative h-[302px] border  rounded-md "}>
                            <div
                                className={"bg-[#F5F5F5] px-3 py-4 rounded-md flex items-center justify-between"}>
                                <h1 className={"text-2xl font-medium "}>Current Package Summary</h1>
                                <ButtonPrimary onClickHandler={() => {
                                    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
                                }} className={"text-[14px]"}>Upgrade</ButtonPrimary>
                            </div>
                            <div className={"space-y-10 flex-col px-6 py-4"}>
                                <div className={"flex items-center justify-between  "}>
                                    <div>
                                        <h1 className={"font-normal text-base text-[#7E7E7E]"}>Package Name</h1>
                                        <p className={"text-xl font-medium"}>{appContext.package.getPackage().getInformation().name}</p>
                                    </div>
                                    <div>
                                        <h1 className={"font-normal text-base text-[#7E7E7E]"}>Package Cycle</h1>
                                        <p className={"text-xl font-medium"}>{appContext.package.getPackage().getInformation().cycle}</p>
                                    </div>
                                    <div>
                                        <h1 className={"font-normal text-base text-[#7E7E7E]"}>Package Cost</h1>
                                        <p className={"text-xl font-medium"}>{'$'+appContext.package.getPackage().getInformation().cost}</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 w-full">
                                    <div className={"space-y-0"}>
                                        {/* <h1 className={"font-normal text-base text-[#7E7E7E]"}>{appContext.package.getPackage().getInformation().useage} Usage</h1> */}
                                        {appContext.package.getPackage().getInformation().useage == 0?
                                            <p className={"text-lg font-normal text-[#444444]"}>{appContext.package.getPackage().getInformation().bundle} Bundle</p>
                                        :
                                            <p className={`text-lg ${appContext.package.getPackage().getPercentUsage() >=80?'text-[#FF001F]':' text-[#444444] '} font-normal `}>{appContext.package.getPackage().getRemining()} out of {appContext.package.getPackage().getInformation().bundle} scans remained</p>
                                        }
                                    </div>
                                    <div className={`h-[20px] relative w-[93%] mt-[8px] rounded-[8px] bg-[#E1E1E1] `}>
                                        <div className={`absolute rounded-[8px]  h-[20px] ${appContext.package.getPackage().getPercentUsage()>=80?'bg-[#FF001F]':'bg-[#544BF0]'}  `} style={{
                                            width:appContext.package.getPackage().getPercentRemining()+'%'
                                        }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={` w-full  ${!showMoreautoPlay&& 'h-[302px] '} border rounded-md `}>
                            <div
                                className={"bg-[#F5F5F5] px-3 py-4 rounded-md flex items-center justify-between"}>
                                <h1 className={" text-2xl font-medium"}>Payment Method</h1>
                            </div>

                            <PaymentMethod></PaymentMethod>                
                            <div className={ "px-6 flex items-center justify-between py-4"}>
                                {/* <div onClick={() => {
                                    setSHowMoreAutoPlay(!showMoreautoPlay)
                                }} className={"font-medium cursor-pointer text-xl flex items-center gap-2 justify-start"}>Turn on Autopay
                                <span><img className={`${!showMoreautoPlay&& 'rotate-180'}`} src="./arrow-down.svg" alt="" /></span>
                                </div>
                                <Switch /> */}
                            </div>
                            {showMoreautoPlay &&
                                <div className="px-6 text-[#444444] mb-6 text-[16px]">
                                    Your saved card will be automatically charged for the same package when your current bundle expires. You can cancel the autorenewal service at any time.
                                </div>
                            }

                        </div>
                    </div>
                    <div className={"w-full mt-16 space-y-5"}>
                        <h1 className={"text-2xl font-medium text-[#2E2E2E]"}>Invoice</h1>
                        <p className={"text-[#7E7E7E] font-normal text-base mb-10"}>Effortlessly handle your billing and
                            invoices right here.</p>
                        <PaymentTable/>
                    </div>
                    <div className={"mt-32"}>
                        <h1 className={"text-2xl font-medium "}>Update Your Subscription Today (Instant Access)</h1>
                        <div className={"flex flex-row w-full overflow-y-scroll hiddenScrollBar items-center pt-10 justify-between gap-4"}>
                            {
                                packages.map((el,index) => {
                                    console.log(el)
                                    return (
                                        <PaymentCard onselect={() => {
                                            PackageApi.byPackage({
                                                sub_code:el.information.subCode,
                                                subprice_code:el.information.subCode,
                                                party_id:localPartyId,
                                                email:localEmail
                                            }).then(res => {
                                                console.log(res)
                                                if(res.data.status == 'success'){
                                                    // console.log(res.data.data)
                                                    window.open(res.data.data, '_blank');
                                                }
                                            })
                                            // appContext.package.updatePackage(el)
                                            // navigate('/')
                                        }} key={index} pak={el}/>
                                    )
                                })
                            }
                            {/* <PaymentCard package={pa}/>
                            <PaymentCard packageId={"2"} bundle={"50 Scan Bundle"} price={"8"}/>
                            <PaymentCard packageId={"3"} bundle={"100 Scan Bundle"} price={"6"}/>
                            <PaymentCard packageId={"4"} bundle={"1000 Scan Bundle"} price={"5"}/> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
