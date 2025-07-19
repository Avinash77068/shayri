import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import userProfile from "../../assets/image/avinash.jpg";
import { useEffect, useState } from "react";
import { setAllData } from "../../store/slice/DataSlice";
import { Link } from "react-router-dom";

type values = {
  _id: string;
  name: string;
  title: string;
  description: string;
  userProfile: string;
};

export default function Cards() {
  const isOpened = useSelector((state: any) => state.states.isOpenDropDown);
  const Alldata = useSelector((state: any) => state.secondStates.AllData);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true); // Loader state

  const getAllData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employee/");
      dispatch(setAllData(res.data));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await api.delete(`/employee/${id}`);
      if (res.status === 200) {
        getAllData();
      }
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <div
        className={`grid ${
          isOpened ? "grid-cols-4" : "grid-cols-5"
        } gap-5 absolute ${
          isOpened ? "left-[18rem]" : "left-[2rem]"
        } top-[5rem] pb-[3rem] flex ${
          isOpened ? "duration-300 " : "duration-500"
        } -z-10 `}
      >
        {loading ? (
          // Loader while fetching data
          <div className="flex justify-center items-center  h-screen ">
            <div className="w-10 h-10 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : Alldata?.data?.length === 0 ? (
          // Show message if no data is available
          <div className="text-center text-gray-600 text-[40px] font-semibold text-lg justify-center flex items-center h-screen">
            No Data Found
          </div>
        ) : (
          // Render cards if data is available
          Alldata?.data?.map((val: values, index: number) => (
            <div
              key={index}
              className="p-4 border border-solid border-gray-200 rounded-2xl transition-all w-[15rem] hover:shadow-lg hover:bg-slate-200 hover:border-purple-500"
            >
              <div className="mb-6 flex justify-between items-center">
                <img
                  src={userProfile}
                  alt="userProfile"
                  className="border-[2px] border-green-400 w-10 h-10 rounded-full"
                />
                <div className="flex gap-2">
                  {" "}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 p-1 bg-black hover:bg-red-500 rounded-full cursor-pointer"
                    onClick={() => handleDelete(val._id)}
                  >
                    {" "}
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M10 11V17"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                      <path
                        d="M14 11V17"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                      <path
                        d="M4 7H20"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                      <path
                        d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                      <path
                        d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                    </g>{" "}
                  </svg>{" "}
                  <Link to={`/create/${val._id}`}>
                    <svg
                      className="w-6 h-6 p-1 bg-black hover:bg-red-500 rounded-full cursor-pointer"
                      viewBox="0 0 21.00 21.00"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      fill="white"
                    >
                      {" "}
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>{" "}
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>{" "}
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <title>edit [#1482]</title>{" "}
                        <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                        <g
                          id="Page-1"
                          stroke-width="0.00021000000000000004"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          {" "}
                          <g
                            id="Dribbble-Light-Preview"
                            transform="translate(-379.000000, -359.000000)"
                            fill="white"
                          >
                            {" "}
                            <g
                              id="icons"
                              transform="translate(56.000000, 160.000000)"
                            >
                              {" "}
                              <path
                                d="M323,219 L343.660141,219 L343.660141,217.042095 L323,217.042095 L323,219 Z M330.231049,212.147332 L330.231049,209.51395 L339.088052,201.64513 L340.979487,203.643172 L332.880712,212.147332 L330.231049,212.147332 Z M344,203.64513 L339.144867,199 L328.165035,208.687714 L328.165035,214.105237 L333.764966,214.105237 L344,203.64513 Z"
                                id="edit-[#1482]"
                              ></path>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>{" "}
                    </svg>
                  </Link>{" "}
                </div>
              </div>

              <h4 className="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500">
                {val.title?.slice(0, 15)}
              </h4>
              <p className="overflow-hidden text-sm font-normal h-[60px] text-gray-500 transition-all duration-500 leading-5 mb-5">
                {val.description?.slice(0, 120)} ....
              </p>
              <div className="flex justify-between">
                <Link
                  to="/product"
                  className="shadow-sm rounded-full py-2 px-2 text-xs text-white font-semibold border-pink-500 border-2 cursor-pointer bg-orange-500"
                >
                  Read more..
                </Link>

                <p className="shadow-sm rounded-full py-2 px-2 text-xs text-black font-semibold border-pink-500 border-2 cursor-pointer">
                  {val.name?.trim()?.slice(0, 10)}..
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
