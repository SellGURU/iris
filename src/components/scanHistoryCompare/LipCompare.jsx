/* eslint-disable react/prop-types */
import RowDetail from "./RowDetail";

const LipCompare = ({scan1,scan2,date1,date2,images}) => {


  return (
    <>
      <div className="w-full flex flex-row gap-2 items-stretch justify-center">
        <div className="flex flex-col items-center justify-center w-[10%] p-2 gap-2 rounded-xl bg-primary-color text-white font-medium text-xl min-h-14">
          <img
            src="/image/icon_lips.png"
            alt="icon_lips"
            className="w-10 h-10"
          />
          Lip
        </div>
        <div className="flex flex-col gap-2 w-full items-stretch justify-start">
          {scan1.map((el,index) => {
            return (
              <RowDetail key={index} date1={date1} date2={date2} el={el} el2={scan2.filter(val =>val.category == el.category)[0]} images={images}></RowDetail>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default LipCompare;
