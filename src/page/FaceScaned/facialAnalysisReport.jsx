/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useConstructor } from "../../help";
import Application from "../../api/Application";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Button } from "symphony-ui";
import { RWebShare } from "react-web-share";
import { useLocalStorage } from "@uidotdev/usehooks";

const FacialAnalysisReport = (props) => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [orgs] = useLocalStorage("orgData");

  useConstructor(() => {
    Application.getScanDetails({
      scanCode: searchParams.get("scanId"),
      orgCode: JSON.parse(orgs).orgCode,
      orgSCode: JSON.parse(orgs).orgSCode,
      client_id: searchParams.get("clientId"),
    }).then((res) => {
      console.log(res);
      setIsLoading(false);
      setDate(new Date(res.data.data.timestamp));
      var decodedHTML = window.atob(res.data.data.html_file);
      document.getElementById("mydiv").innerHTML = decodedHTML;
    });
  });
  const download = () => {
    // const downloadLink = document.createElement("a");
    // downloadLink.href = pdf;
    // downloadLink.download = 'download.html';
    // downloadLink.click();
    var mywindow = window.open("", "PRINT", "height=400,width=600");
    // // console.log(document.getElementById('reported'))
    mywindow.document.write(
      "<html><head><title>" + document.title + "</title>"
    );
    mywindow.document.write("</head><body >");
    mywindow.document.write("<h1>" + document.title + "</h1>");
    mywindow.document.write(document.getElementById("mydiv").innerHTML);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
    // window.frames["reported"].focus();
    // window.frames["reported"].print();
    // document.getElementById("mydiv").contentWindow.print();
    // document.getElementById('reported').contentWindow.print();
    // return false;
    return true;
    // var decodedHTML = window.atob(pdf.replace("data:text/html;base64,",''));
    // console.log(pdf.replace("data:text/html;base64,",''))
    // document.getElementById("mydiv").innerHTML = decodedHTML;
  };
  return (
    <>
      <div>
        <div className={`${isLoading && "hidden"}`}>
          {!props?.smallReport && (
            <div className="px-12">
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" className="text-primary-color" href="/">
                  Home
                </Link>
                <Typography className="text-primary-color">
                  View Report
                </Typography>
              </Breadcrumbs>
              {/* /////////////////////////////////Header section/////////////////////// */}
              <div className="text-center text-[28px] text-[#2E2E2E] font-medium mb-2 mt-4">
                Face Scan Completed
              </div>
              <div className="flex justify-center">
                <div
                  className="text-justify text-lg text-[#444444] w-[600px] md:w-[850px] md:max-w-[850px] mb-4"
                  style={{
                    textAlignLast: "center",
                  }}
                >
                  Here is the report of your report. Use the top-right buttons
                  to download the PDF or share the document. To remove the
                  report or return to the home page, use the buttons at the
                  bottom.
                </div>
              </div>

              <div className="w-full justify-between mb-4 flex mt-5 items-center">
                <div className="md:flex justify-start items-center">
                  <div className="text-[#444444] text-lg font-normal mr-[230px]">
                    Client ID: {searchParams.get("clientId")}
                  </div>
                  <div className="text-[#7E7E7E] font-normal text-sm mr-8">
                    Date:{" "}
                    {date.getDate() +
                      "   " +
                      date.toLocaleString("default", { month: "long" }) +
                      "   " +
                      date.getFullYear()}
                  </div>
                  <div className="text-[#7E7E7E] font-normal text-sm">
                    Time: {date.getHours()}:{date.getMinutes()}
                  </div>
                </div>
                <div className="flex-col md:flex-row flex justify-end gap-4 items-center">
                  <Button theme="iris-tertiary">
                    <div className="pelusicon tirtryIconHover bg-primary-color" />
                    Add Comment
                  </Button>
                  <RWebShare
                    data={{
                      text: "iris",
                      url: "https://iris.ainexus.com/v1/golden_ratios/" + "",
                      title: "iris",
                    }}
                  >
                    <Button
                      onClick={() => {
                        navigator.share({
                          url:
                            "https://iris.ainexus.com/v1/golden_ratios/" + "",
                        });
                      }}
                      theme="iris-secondary"
                    >
                      <img className="mr-2" src="share2.svg" alt="" />
                      Share
                    </Button>
                  </RWebShare>
                  <Button onClick={download} theme="iris">
                    <img className="mr-2" src="print.svg" alt="" />
                    Print Report
                  </Button>
                </div>
              </div>

              <div className="w-full justify-center my-8 flex items-center gap-8">
                <Button theme="iris-secondary">Facial Analysis</Button>
                <div className="text-[#7E7E7E] font-normal text-lg">
                  Overall Analysis
                </div>
              </div>

              {/* /////////////////////////////////Summary section/////////////////////// */}
              <div className="w-full justify-center flex flex-row gap-6 items-stretch">
                <img
                  src="/image/faceOverall-05.png"
                  alt="face-image"
                  className="flex flex-col w-1/2 rounded-3xl border-2 border-primary-color"
                />

                <div className="flex flex-col w-1/2 gap-4 py-8 px-10 rounded-3xl bg-[#f8f8f8]">
                  <div className="w-full flex flex-row text-2xl font-medium items-center justify-between mb-2">
                    Face Measurements Summary
                    <div className="text-[#7E7E7E] font-normal text-sm">
                      2024/02/02
                    </div>
                  </div>
                  <div className="flex flex-col gap-5 font-normal text-base">
                    <div className="flex flex-col">
                      <p>1. Face Width</p>
                      <p className="text-[#7E7E7E] mt-2 decorated-dot">
                        Description: The widest part of the face, measured
                        across the cheekbones.
                      </p>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="decorated-dot">Measurement: 14.8 cm</p>
                        <div className="flex flex-col items-start justify-start gap-2 w-[45%]">
                          <div className="text-[10px] font-light self-center">
                            No Action Requred
                          </div>
                          <div className="w-full h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                            <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                            <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                            <div className="w-1/3 h-full bg-primary-color"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <p>2. Face Height</p>
                      <p className="text-[#7E7E7E] mt-2 decorated-dot">
                        Description: From the hairline to the chin.
                      </p>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="decorated-dot">Measurement: 19.3 cm</p>
                        <div className="flex flex-col items-start justify-start gap-2 w-[45%]">
                          <div className="text-[10px] font-light self-center">
                            Normal
                          </div>
                          <div className="w-full h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                            <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                            <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                            <div className="w-1/3 h-full bg-primary-color"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <p>3. Jawline Width</p>
                      <p className="text-[#7E7E7E] mt-2 decorated-dot">
                        Description: Distance between the angles of the jaw.
                      </p>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="decorated-dot">Measurement: 11.5 cm</p>
                        <div className="flex flex-col items-start justify-start gap-2 w-[45%]">
                          <div className="text-[10px] font-light self-center">
                            Action Needed
                          </div>
                          <div className="w-full h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                            <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                            <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                            <div className="w-1/3 h-full bg-primary-color"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <p>4. Nose Length</p>
                      <p className="text-[#7E7E7E] mt-2 decorated-dot">
                        Description: From the bridge of the nose to the tip.
                      </p>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="decorated-dot">Measurement: 5.2 cm</p>
                        <div className="flex flex-col items-start justify-start gap-2 w-[45%]">
                          <div className="text-[10px] font-light self-center">
                            Action Needed
                          </div>
                          <div className="w-full h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                            <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                            <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                            <div className="w-1/3 h-full bg-primary-color"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <p>5. Eye Distance</p>
                      <p className="text-[#7E7E7E] mt-2 decorated-dot">
                        Description: Distance between the inner corners of the
                        eyes.
                      </p>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="decorated-dot">Measurement: 3.1 cm</p>
                        <div className="flex flex-col items-start justify-start gap-2 w-[45%]">
                          <div className="text-[10px] font-light self-center">
                            No Action Requred
                          </div>
                          <div className="w-full h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                            <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                            <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                            <div className="w-1/3 h-full bg-primary-color"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <p>6. Lip Width</p>
                      <p className="text-[#7E7E7E] mt-2 decorated-dot">
                        Description: Distance between the corners of the lips
                        when at rest.
                      </p>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="decorated-dot">Measurement: 5.8 cm</p>
                        <div className="flex flex-col items-start justify-start gap-2 w-[45%]">
                          <div className="text-[10px] font-light self-center">
                            Normal
                          </div>
                          <div className="w-full h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                            <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                            <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                            <div className="w-1/3 h-full bg-primary-color"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <p>7. Forehead Height</p>
                      <p className="text-[#7E7E7E] mt-2 decorated-dot">
                        Description: Distance from the hairline to the brow.
                      </p>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="decorated-dot">Measurement: 6.8 cm</p>
                        <div className="flex flex-col items-start justify-start gap-2 w-[45%]">
                          <div className="text-[10px] font-light self-center">
                            Action Needed
                          </div>
                          <div className="w-full h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                            <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                            <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                            <div className="w-1/3 h-full bg-primary-color"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <p>8. Symmetry</p>
                      <p className="text-[#7E7E7E] mt-2 decorated-dot">
                        Description: Overall facial symmetry score.
                      </p>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="decorated-dot">
                          Left-to-Right Symmetry: 92%
                        </p>
                        <div className="flex flex-col items-start justify-start gap-2 w-[45%]">
                          <div className="text-[10px] font-light self-center">
                            Normal
                          </div>
                          <div className="w-full h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                            <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                            <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                            <div className="w-1/3 h-full bg-primary-color"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={`${!isLoading && "hidden"}`}>
          <div className="w-full flex justify-center items-center min-h-[350px]">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-16 h-16 text-stone-200 animate-spin  fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        <div id="mydiv" className="px-12"></div>
      </div>
    </>
  );
};

export default FacialAnalysisReport;