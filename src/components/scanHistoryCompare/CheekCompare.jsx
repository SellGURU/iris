/* eslint-disable react/prop-types */

import RowDetail from "./RowDetail";
const CheekCompare = ({scan1,scan2,date1,date2,images,isShowImages}) => {
  return (
    <>
      <div className="w-full flex flex-row gap-2 items-stretch justify-center">
        <div className="flex flex-col items-center justify-center min-w-[100px] w-[10%] p-2 gap-2 rounded-xl bg-primary-color text-white font-medium text-lg xl:text-xl min-h-14">
          <img
            src="/image/icon_cheekbones.png"
            alt="icon_cheekbones"
            className="w-10 h-10"
          />
          Cheek
        </div>
        <div className="flex flex-col gap-2 w-full items-stretch justify-start">
          {scan1.map((el,index) => {
            return (
              <RowDetail key={index} isShowImages={isShowImages} date1={date1} date2={date2} el={el} el2={scan2.filter(val =>val.key == el.key)[0]} images={images}></RowDetail>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default CheekCompare;
