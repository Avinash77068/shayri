import { useDispatch, useSelector } from "react-redux";

import apiRequest from "../../utils/apiRequest";
import { Link } from "react-router-dom";
import { SetAllParams } from "../../store/slice/AllParams";
export default function Cards() {
  const isOpened = useSelector((state: any) => state.states.isOpenDropDown);
  const Alldata = useSelector((state: any) => state.secondStates.AllData);
  const dispatch=useDispatch()
  apiRequest();
  const IdDetails = (id: any) => {
   dispatch(SetAllParams(id))
  };
  return (
    <>
      <div
        className={`grid ${
          isOpened ? "grid-cols-4" : "grid-cols-5"
        } gap-5 absolute ${
          isOpened ? "left-[18rem]" : "left-[2rem]"
        }  top-[5rem] pb-[3rem]  flex ${
          isOpened ? "duration-300 " : "duration-500"
        }`}
      >
        {Alldata.map((val: any, index: number) => {
          return (
            <div
              key={index}
              className=" p-4 border border-solid border-gray-200 rounded-2xl  transition-all w-[15rem] "
            >
              <div className=" mb-6">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.66699 12.8162L11.3501 15.4993C11.5616 15.7107 11.9043 15.7109 12.1158 15.4997L17.8753 9.75033M13.0003 23.8337C7.01724 23.8337 2.16699 18.9834 2.16699 13.0003C2.16699 7.01724 7.01724 2.16699 13.0003 2.16699C18.9834 2.16699 23.8337 7.01724 23.8337 13.0003C23.8337 18.9834 18.9834 23.8337 13.0003 23.8337Z"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <h4 className="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500 ">
                {val.title.slice(1, 20)}
              </h4>
              <p className=" overflow-hidden text-sm font-normal h-[100px] text-gray-500 transition-all duration-500 leading-5 mb-5">
                {val.description.slice(0, 120)}
              </p>

              <Link to={`/id?=${val.id}`}
                className="bg-indigo-600 shadow-sm rounded-full py-2 px-5 text-xs text-white font-semibold"
                onClick={() => IdDetails(val.id)}
              >
                Read More . .
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
