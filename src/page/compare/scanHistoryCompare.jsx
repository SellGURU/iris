import { SearchBox } from "../../components/searchBox/SearchBox";
import { Button } from "symphony-ui";
import { Tooltip } from "react-tooltip";
import CompareSection from "../../components/scanHistoryCompare/CompareSection";

export const ScanHistoryCompare = () => {
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="xl:container w-full flex flex-col px-2 xl:px-[24px] gap-8">
          {/* /////////////////////////////////Header section/////////////////////// */}
          <div className="w-full flex flex-col items-center gap-4 mb-2">
            <h1 className="text-[26px] font-semibold text-[#1A1919] ">
              Scan Library
            </h1>
            <p className="text-lg font-normal text-[#606060] max-w-[800px] text-center">
              Scan Library records past scanned documents, showing details like
              date, categorization, download options, and patient scan
              comparisons for easy reference and retrieval.
            </p>
          </div>

          {/* /////////////////////////////////Top bar section/////////////////////// */}
          <div className="flex w-full justify-between text-base">
            <div className="md:220px relative z-20 xl:w-[280px]">
              <Button theme="iris-small">
                <img className="mr-1 w-5" src="fi_plus.svg" alt="" />
                Add a New Patient
              </Button>
            </div>
            <div className="absolute z-[10] w-full h-8 left-0 flex justify-center items-center">
              <SearchBox className="h-8" placeHolder="Search" />
            </div>
            <div className="flex xl:w-[280px] justify-end relative z-[20] gap-8 items-center">
              <div
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Filter your scan history by specific criteria."
                className="flex items-center gap-2 cursor-pointer"
              >
                <img className="w-5" src="filter.svg" alt="" />
                Filter by
              </div>
              <Tooltip className="max-w-[240px] bg-white" id="my-tooltip" />

              <div
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Sort your scan history by date, from newest to oldest or vice versa, or by the number of scans, from most to least or vice vesra."
                className="flex items-center gap-2 cursor-pointer me-6"
              >
                <img className="w-5" src="sort.svg" alt="" />
                Sort by Default
              </div>
            </div>
          </div>

          {/* /////////////////////////////////Clients sections/////////////////////// */}
          <div className="flex flex-col gap-8 w-full">
            {/* /////////////////////////////////Client 1 section/////////////////////// */}
            <div className="flex gap-8 flex-col rounded-lg justify-start border px-10 py-8 shadow-box">
              <div className="flex flex-row items-center justify-center gap-8">
                <div className="flex items-center self-start gap-5">
                  <span className="text-base font-normal text-[#7E7E7E]">
                    1
                  </span>
                  <img
                    className="rounded-[8px] w-[62px] h-[53px] border-[#0000001A] border"
                    src="/image/client-01.png"
                    alt=""
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-6">
                  <div className="flex justify-between w-full pb-6 gap-8 border-b border-b-[#00000033]">
                    <div className="text-[20px] font-bold">
                      Client ID: 11223344
                    </div>

                    <div className="flex gap-2 text-base font-medium items-center justify-between">
                      <Button theme="iris-tertiary-small">
                        Show comments (0)
                        <div className="arowDownIcon-purple ml-2"></div>
                      </Button>
                      <Button theme="iris-secondary-small">
                        <img src="./image/close.svg" className="mr-2" alt="" />
                        Cancel
                      </Button>
                      <Button theme="iris-small">
                        <img className="mr-2" src="camera.svg" alt="" />
                        New Scan
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col w-full gap-6">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex justify-start items-center font-medium text-base">
                        Scan reports
                      </div>
                      <div className="text-[#7E7E7E] text-base font-normal">
                        Date: 12 April 2024
                      </div>
                      <div className="flex gap-2 items-center">
                        <Button theme="iris-secondary-small">
                          <div className="shareIcon-purple"></div>
                        </Button>
                        <Button theme="iris-secondary-small">
                          <div className="downloadIcon-purple"></div>
                        </Button>
                        <Button theme="iris-secondary-small">
                          View Reports
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <div className="flex justify-start items-center font-medium text-base">
                        Scan reports
                      </div>
                      <div className="text-[#7E7E7E] text-base font-normal">
                        Date: 12 April 2024
                      </div>
                      <div className="flex gap-2 items-center">
                        <Button theme="iris-secondary-small">
                          <div className="shareIcon-purple"></div>
                        </Button>
                        <Button theme="iris-secondary-small">
                          <div className="downloadIcon-purple"></div>
                        </Button>
                        <Button theme="iris-secondary-small">
                          View Reports
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center w-full">
                    <div className="flex justify-start items-center font-medium text-base">
                      Scan reports
                    </div>
                    <div className="text-[#7E7E7E] text-base font-normal">
                      Date: 12 April 2024
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button theme="iris-secondary-small">
                        <div className="shareIcon-purple"></div>
                      </Button>
                      <Button theme="iris-secondary-small">
                        <div className="downloadIcon-purple"></div>
                      </Button>
                      <Button theme="iris-secondary-small">View Reports</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-center">
                <div className="text-primary-color flex justify-center items-center cursor-pointer font-medium text-center mt-4">
                  See Less
                  <div className="arowUpIcon-purple ml-1"></div>
                </div>
              </div>
            </div>

            {/* /////////////////////////////////Information Client 1 section/////////////////////// */}
            <CompareSection />

            {/* /////////////////////////////////Client 2 section/////////////////////// */}
            <div className="flex gap-12 rounded-lg items-center justify-start border px-10 py-8 shadow-box">
              <div className="flex items-center self-start gap-5">
                <span className="text-base font-normal text-[#7E7E7E]">2</span>
                <img
                  className="rounded-[8px] w-[62px] h-[53px] border-[#0000001A] border"
                  src="/image/client-01.png"
                  alt=""
                />
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-6">
                <div className="flex justify-between w-full pb-6 gap-8 border-b border-b-[#00000033]">
                  <div className="text-[20px] font-bold">
                    Client ID: 11223343
                  </div>

                  <div className="flex gap-2 text-base font-medium items-center justify-between">
                    <Button theme="iris-tertiary-small">
                      Show comments (2)
                      <div className="arowDownIcon-purple ml-2"></div>
                    </Button>
                    <Button theme="iris-secondary-small">
                      <img src="./image/shapes.svg" className="mr-2" alt="" />
                      Compare
                    </Button>
                    <Button theme="iris-small">
                      <img className="mr-2" src="camera.svg" alt="" />
                      New Scan
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-6">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex justify-start items-center font-medium text-base">
                      Scan reports
                    </div>
                    <div className="text-[#7E7E7E] text-base font-normal">
                      Date: 12 April 2023
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button theme="iris-secondary-small">
                        <div className="shareIcon-purple"></div>
                      </Button>
                      <Button theme="iris-secondary-small">
                        <div className="downloadIcon-purple"></div>
                      </Button>
                      <Button theme="iris-secondary-small">View Reports</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* /////////////////////////////////Client 3 section/////////////////////// */}
            <div className="flex gap-12 rounded-lg items-center justify-start border px-10 py-8 shadow-box">
              <div className="flex items-center self-start gap-5">
                <span className="text-base font-normal text-[#7E7E7E]">3</span>
                <img
                  className="rounded-[8px] w-[62px] h-[53px] border-[#0000001A] border"
                  src="/image/client-02.png"
                  alt=""
                />
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-6">
                <div className="flex justify-between w-full pb-6 gap-8 border-b border-b-[#00000033]">
                  <div className="text-[20px] font-bold">
                    Client ID: 11223343
                  </div>

                  <div className="flex gap-2 text-base font-medium items-center justify-between">
                    <Button theme="iris-tertiary-small">
                      Show comments (0)
                      <div className="arowDownIcon-purple ml-2"></div>
                    </Button>
                    <Button theme="iris-secondary-small">
                      <img src="./image/shapes.svg" className="mr-2" alt="" />
                      Compare
                    </Button>
                    <Button theme="iris-small">
                      <img className="mr-2" src="camera.svg" alt="" />
                      New Scan
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-6">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex justify-start items-center font-medium text-base">
                      Scan reports
                    </div>
                    <div className="text-[#7E7E7E] text-base font-normal">
                      Date: 12 April 2023
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button theme="iris-secondary-small">
                        <div className="shareIcon-purple"></div>
                      </Button>
                      <Button theme="iris-secondary-small">
                        <div className="downloadIcon-purple"></div>
                      </Button>
                      <Button theme="iris-secondary-small">View Reports</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* /////////////////////////////////Client 4 section/////////////////////// */}
            <div className="flex gap-12 rounded-lg items-center justify-start border px-10 py-8 shadow-box">
              <div className="flex items-center self-start gap-5">
                <span className="text-base font-normal text-[#7E7E7E]">4</span>
                <img
                  className="rounded-[8px] w-[62px] h-[53px] border-[#0000001A] border"
                  src="/image/client-02.png"
                  alt=""
                />
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-6">
                <div className="flex justify-between w-full pb-6 gap-8 border-b border-b-[#00000033]">
                  <div className="text-[20px] font-bold">
                    Client ID: 11223342
                  </div>

                  <div className="flex gap-2 text-base font-medium items-center justify-between">
                    <Button theme="iris-tertiary-small">
                      Show comments (0)
                      <div className="arowDownIcon-purple ml-2"></div>
                    </Button>
                    <Button theme="iris-secondary-small">
                      <img src="./image/shapes.svg" className="mr-2" alt="" />
                      Compare
                    </Button>
                    <Button theme="iris-small">
                      <img className="mr-2" src="camera.svg" alt="" />
                      New Scan
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-6">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex justify-start items-center font-medium text-base">
                      Scan reports
                    </div>
                    <div className="text-[#7E7E7E] text-base font-normal">
                      Date: 12 April 2023
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button theme="iris-secondary-small">
                        <div className="shareIcon-purple"></div>
                      </Button>
                      <Button theme="iris-secondary-small">
                        <div className="downloadIcon-purple"></div>
                      </Button>
                      <Button theme="iris-secondary-small">View Reports</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* /////////////////////////////////Client 5 section/////////////////////// */}
            <div className="flex gap-12 rounded-lg items-center justify-start border px-10 py-8 shadow-box">
              <div className="flex items-center self-start gap-5">
                <span className="text-base font-normal text-[#7E7E7E]">5</span>
                <img
                  className="rounded-[8px] w-[62px] h-[53px] border-[#0000001A] border"
                  src="/image/client-02.png"
                  alt=""
                />
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-6">
                <div className="flex justify-between w-full pb-6 gap-8 border-b border-b-[#00000033]">
                  <div className="text-[20px] font-bold">
                    Client ID: 11223342
                  </div>

                  <div className="flex gap-2 text-base font-medium items-center justify-between">
                    <Button theme="iris-tertiary-small">
                      Show comments (0)
                      <div className="arowDownIcon-purple ml-2"></div>
                    </Button>
                    <Button theme="iris-secondary-small">
                      <img src="./image/shapes.svg" className="mr-2" alt="" />
                      Compare
                    </Button>
                    <Button theme="iris-small">
                      <img className="mr-2" src="camera.svg" alt="" />
                      New Scan
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-6">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex justify-start items-center font-medium text-base">
                      Scan reports
                    </div>
                    <div className="text-[#7E7E7E] text-base font-normal">
                      Date: 12 April 2023
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button theme="iris-secondary-small">
                        <div className="shareIcon-purple"></div>
                      </Button>
                      <Button theme="iris-secondary-small">
                        <div className="downloadIcon-purple"></div>
                      </Button>
                      <Button theme="iris-secondary-small">View Reports</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* /////////////////////////////////Pagination section/////////////////////// */}
          <hr className="h-[1px] bg-[#00000033] w-full mb-2" />
          <div className="flex items-center justify-center relative">
            <p className="text-[#7E7E7E] font-normal text-base absolute left-6">
              Show{" "}
              <span className="text-[#544BF0] underline underline-offset-2">
                5
              </span>{" "}
              rows per page.
            </p>
            <div className="flex items-center justify-center gap-[26px] text-xl relative">
              <div className="arrow-left-disable"></div>
              <div className="px-2 font-bold text-white bg-primary-color rounded">
                1
              </div>
              <div className="px-[6px] font-normal text-[#7E7E7E]">2</div>
              <div className="px-[6px] font-normal text-[#7E7E7E]">3</div>
              <div className="px-[6px] font-normal text-[#7E7E7E]">4</div>
              <div className="arrow-right-purple"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
