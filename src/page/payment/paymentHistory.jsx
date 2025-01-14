import ButtonPrimary from "../../components/button/buttonPrimery.jsx";
import { PaymentTable } from "./paymentTable.jsx";
import { PaymentCard } from "./paymentCard.jsx";
import PaymentMethod from "./paymentMethod.jsx";
import { PatientContext } from "../../context/context.jsx";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Package from "../../model/Package.js";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import PackageApi from "../../api/package.js";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useConstructor, encryptTextResolver } from "../../help.js";
import Package2 from "../../model/Package.js";
import { publish, subscribe } from "../../utility/event.js";
import {SucessPayemntModal} from './SucessPayemntModal.jsx'
import HorizontalSlider from "../../components/SliderHoristical/index.jsx";
export const PaymentHistory = () => {
  const appContext = useContext(PatientContext);

  let [org] = useLocalStorage("orgData");
  let [localEmail] = useLocalStorage("email");
  const checkOrg = () => {
    PackageApi.getIrisSub({
      email: encryptTextResolver(localEmail + ""),
    }).then((res) => {
      // console.log(res)
      if (res.data.data.subs_data.length > 0) {
        let newPak = new Package2({
          name: "No available package",
          cycle: "Yearly",
          cost: 0,
          useage: res.data.data.subs_data[0].iscan_used,
          bundle: res.data.data.subs_data[0].iscan_brought,
          discount: 0,
          options: [],
        });
        // console.log(newPak)
        appContext.package.updatePackage(newPak);
        publish("updatePackage");
      }
    });
  };
  const [packageCurrent, setPackageCurrent] = useState(
    appContext.package.getPackage()
  );
  useEffect(() => {
      checkOrg();
      setPackageCurrent(appContext.package.getPackage());
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  const formatDate = (date) => {
    const dateObj = new Date(date); // Ensure date is a Date object
    const year = dateObj.getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[dateObj.getMonth()]; // Get the month name
    const day = dateObj.getDate().toString(); // Get the day

    return ` ${day} ${month} ${year}`;
  };
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 500);
  }, []);
  // console.log(appContext.package.getPackage())
  const navigate = useNavigate();
  let [localPartyId] = useLocalStorage("partyid");
  subscribe("updatePackage",() => {
    setPackageCurrent(appContext.package.getPackage());
  })
  const [orgs] = useLocalStorage("orgData");
  useConstructor(() => {
    // console.log(new Date(JSON.parse(org).subs_data[0].active_to * 1000).toLocaleDateString())
    PackageApi.getPackages().then((res) => {
      const resolved = res.data.map((el) => {
        return new Package({
          name: el.display_name,
          cycle: el.sub_period,
          cost: el.sd_price,
          useage: 0,
          oldCost: el.sr_price,
          bundle: el.allowed_scans,
          subCode: el.sub_code,
          subprice_code: el.subprice_code,
          discount: el.sr_price == el.sd_price ? "0" : el.sdiscount,
          options: el.subs_info_data.display_points_list,
        });
      });
      setPackages(resolved);
    });
    PackageApi.getPymentHistory({
      orgCode: JSON.parse(orgs).orgCode,
      orgSCode: JSON.parse(orgs).orgSCode,
      email: encryptTextResolver(localEmail + ""),
    }).then((res) => {
      if (res.data.status != "fail") {
        setTransactions(res.data.data);
      }
      // console.log(res)
    });
  });

  const [packages, setPackages] = useState([
    new Package({
      name: "Individual",
      cycle: "Yearly",
      cost: 10,
      useage: 0,
      bundle: 1,
      discount: "0",
      subCode: "+sPwwWEH4syZZdnvq5k/jA==",
      subprice_code: "+sPwwWEH4syZZdnvq5k/jA==",
      options: ["1 Scan", "Use Within 12 Months", " "],
    }),
    new Package({
      name: "Essential",
      cycle: "Yearly",
      cost: 375,
      useage: 0,
      bundle: 50,
      discount: "25",
      oldCost: "500",
      subCode: "cKdL+SBoIZT8thdWlpB6Xg==",
      subprice_code: "cKdL+SBoIZT8thdWlpB6Xg==",
      options: ["$8 Per Scan", "50 Scan Bundle", "Use Within 12 Months"],
    }),
    new Package({
      name: "Pro",
      cycle: "Yearly",
      cost: 600,
      useage: 0,
      bundle: 100,
      discount: "40",
      oldCost: "1000",
      subCode: "jrF6+co9GsoMxmC6FK+xLw==",
      subprice_code: "jrF6+co9GsoMxmC6FK+xLw==",
      options: ["$6 Per Scan", "100 Scan Bundle", "Use Within 12 Months"],
    }),
    new Package({
      name: "Unlimited",
      cycle: "Yearly",
      cost: 5000,
      useage: 0,
      bundle: 1000,
      discount: "50",
      oldCost: "10000",
      subCode: "gFXhS/ruHAPbiz0k0SPN3w==",
      subprice_code: "gFXhS/ruHAPbiz0k0SPN3w==",
      options: ["$5 Per Scan", "1000 Scan Bundle", "Use Within 12 Months"],
    }),
  ]);
  const [showMoreautoPlay, setSHowMoreAutoPlay] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const payment = queryParams.get("payment");

    if (payment === "true") {
      setShowModal(true);
      setTimeout(() => {
        checkOrg()
      }, 200);
    }
  }, [location.search]);
  useEffect(()=>console.log(showModal),[showModal])
  return (
    <>
      {showModal &&   <SucessPayemntModal onClose={() => setShowModal(false)} />
}

      <div className={"flex gap-5 items-center justify-center px-16  flex-col"}>
        <div className="px-0  w-full flex justify-start">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" className="text-primary-color" href="/">
              Home
            </Link>
            <Link
              underline="hover"
              className="text-primary-color"
              href="/#/faceCamera"
            >
              Face Scanner
            </Link>
            <Typography className="text-primary-color">Payment</Typography>
          </Breadcrumbs>
        </div>
        <h1 className={"text-3xl font-medium"}>Payment History</h1>
        <p className={"text-lg font-normal"}>
          You can view your orders, payments, cards, and current package status
          here.
        </p>
        <div className={"w-full"}>
          <div>
            <div
              className={
                "block lg:flex w-full flex-col md:flex-row  gap-10 items-start justify-between"
              }
            >
              <div
                className={
                  " w-full mb-8 lg:mb-0 relative h-[302px] border  rounded-md "
                }
              >
                <div
                  className={
                    "bg-[#F5F5F5] px-3 py-4 rounded-md flex items-center justify-between"
                  }
                >
                  <h1 className={"text-xl font-medium "}>Scans Left</h1>
                </div>
                <div className={"space-y-6 flex-col px-6 py-4"}>
                  <span className="font-nomral text-[#7E7E7E]">Usage</span>
                  <p className="text-lg font-normal text-[#444444]">
                    {" "}
                    <span className="font-bold">
                      {packageCurrent.getRemining()}{" "}
                    </span>{" "}
                    out of {packageCurrent.getInformation().bundle} Scan
                    {packageCurrent.getInformation().bundle > 1 && "s"} left
                  </p>

                  <div className="w-full">
                    <div
                      className={`h-[20px] relative w-[93%]  rounded-[8px] bg-[#E1E1E1] `}
                    >
                      <div
                        className={`absolute rounded-[8px]  h-[20px] ${
                          packageCurrent.getPercentUsage() >= 80
                            ? "bg-[#FF001F]"
                            : "bg-[#544BF0]"
                        }  `}
                        style={{
                          width: packageCurrent.getPercentRemining() + "%",
                        }}
                      ></div>
                    </div>
                  </div>
                  {JSON.parse(org).subs_data[0]?.active_to && (
                    <div className=" font-normal text-[#7E7E7E]">
                      Expire Date:{" "}
                      {formatDate(new Date(JSON.parse(org).subs_data[0]?.active_to * 1000))
                        }
                    </div>
                  )}
                </div>
              </div>

              <div
                className={
                  " w-full mb-8 lg:mb-0 relative h-[302px] border  rounded-md "
                }
              >
                <div
                  className={
                    "bg-[#F5F5F5] px-3 py-4 rounded-md flex items-center justify-between"
                  }
                >
                  <h1 className={"text-xl font-medium "}>
                    Transaction History
                  </h1>
                </div>
                <div className="overflow-auto max-h-[225px]">
                  <table className="min-w-full bg-white ">
                    <thead className="border-b  text-[16px]">
                      <tr className="w-full  text-[#2E2E2E] font-medium">
                        <th className="py-2 px-4 font-medium">Billing Date</th>
                        <th className="py-2 px-4  font-medium">
                          Number of Scan
                        </th>
                        <th className="py-2 px-4 font-medium">Price</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {transactions.map((transaction, index) => (
                        <tr key={index} className="pt-2">
                          <td className="py-3 px-4 text-center text-[#2E2E2E]">
                            {formatDate(transaction.payDateTime)}
                          </td>
                          <td className="py-3 px-4 text-center text-[#2E2E2E]">
                            {transaction.subScansAllowed}
                          </td>
                          <td className="py-3 px-4 text-center text-[#2E2E2E]">
                            {" "}
                            {transaction.priceSymbol} {transaction.subPrice}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <div className={` w-full  ${!showMoreautoPlay&& 'h-[302px] '}  rounded-md `}>
                          
                            <div className="border p-4 rounded-lg">
                                <h2 className="text-lg font-bold mb-4">Transaction History</h2>
                                <div className="overflow-auto max-h-[225px]" >
                                    <table className="min-w-full bg-white ">
                                    <thead className="border-b  text-xl">
                                        <tr className="w-full bg-[#F5F5F5] text-[#2E2E2E] font-medium">
                                        <th className="py-2 px-4 font-medium">Billing Date</th>
                                        <th className="py-2 px-4  font-medium">Number of Scan</th>
                                        <th className="py-2 px-4 font-medium">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {transactions.map((transaction, index) => (
                                        <tr key={index}className="pt-2">
                                            <td className="py-3 px-4 text-center text-[#2E2E2E]">{formatDate(transaction.payDateTime)}</td>
                                            <td className="py-3 px-4 text-center text-[#2E2E2E]">{transaction.subScansAllowed}</td>
                                            <td className="py-3 px-4 text-center text-[#2E2E2E]"> {transaction.priceSymbol} {transaction.subPrice}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={ "px-6 flex items-center justify-between py-4"}>
                            </div>
                            {showMoreautoPlay &&
                                <div className="px-6 text-[#444444] mb-6 text-[16px]">
                                    Your saved card will be automatically charged for the same package when your current bundle expires. You can cancel the autorenewal service at any time.
                                </div>
                            }

                        </div> */}
            </div>
            {/* <div className={"w-full mt-16 space-y-5"}>
                        <h1 className={"text-2xl font-medium text-[#2E2E2E]"}>Invoice</h1>
                        <p className={"text-[#7E7E7E] font-normal text-base mb-10"}>Effortlessly handle your billing and
                            invoices right here.</p>
                        <PaymentTable/>
                    </div> */}
            <div className={"mt-10"}>
              <h1 className={"text-2xl font-medium "}>Purchase More Scans</h1>
              <div
                className={
                  "py-2"
                }
              >
                <HorizontalSlider>
                  {packages.map((el, index) => {
                    console.log(el);
                    return (
                      <PaymentCard
                        onselect={() => {
                          PackageApi.byPackage({
                            sub_code: el.information.subCode,
                            subprice_code: el.information.subCode,
                            orgCode: JSON.parse(orgs).orgCode,
                            orgSCode: JSON.parse(orgs).orgSCode,
                            email: encryptTextResolver(localEmail),
                          }).then((res) => {
                            console.log(res);
                            if (res.data.status == "success") {
                              // console.log(res.data.data)
                              window.location.href = res.data.data;

                            }
                          });
                          // appContext.package.updatePackage(el)
                          // navigate('/')
                        }}
                        key={index}
                        pak={el}
                      />
                    );
                  })}

                </HorizontalSlider>
                {/* <PaymentCard package={pa}/>
                            <PaymentCard packageId={"2"} bundle={"50 Scan Bundle"} price={"8"}/>
                            <PaymentCard packageId={"3"} bundle={"100 Scan Bundle"} price={"6"}/>
                            <PaymentCard packageId={"4"} bundle={"1000 Scan Bundle"} price={"5"}/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
