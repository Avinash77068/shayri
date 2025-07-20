import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import userProfile from "../../assets/image/avinash.jpg";
import { useEffect, useState } from "react";
import { setAllData } from "../../store/slice/DataSlice";
import { Link } from "react-router-dom";
// import { FaTrashAlt, FaUserEdit } from "react-icons/fa";

type values = {
  _id: string;
  name: string;
  title: string;
  description: string;
  userProfile: string;
};

export default function Cards() {
  const Alldata = useSelector((state: any) => state.secondStates.AllData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loader state
  const isOpened = useSelector((state: any) => state.states.isOpened)
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

  // const handleDelete = async (id: string) => {
  //   try {
  //     const res = await api.delete(`/employee/${id}`);
  //     if (res.status === 200) {
  //       getAllData();
  //     }
  //   } catch (err) {
  //     console.error("Error deleting data:", err);
  //   }
  // };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className={`w-full flex justify-center ${!isOpened?"lg:left-[18rem]":"left-[2rem]"}`}>
      <div
        className={` gap-5 px-4 w-full absolute flex flex-col lg:flex-row items-center justify-center lg:justify-start   top-[5rem] pb-12 transition-all duration-500 -z-10 
         `}
      >
        {loading ? (
          <div className="flex justify-center items-center h-[60vh] w-full col-span-full">
            <div className="w-10 h-10 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : Alldata?.data?.length === 0 ? (
          <div className="text-center text-gray-600  max-w-[300px] max-w-[300px] text-2xl font-semibold flex items-center justify-center h-[60vh] w-full col-span-full">
            No Data Found
          </div>
        ) : (
          Alldata?.data?.map((val: values) => (
            <div
              key={val._id}
              className="p-4  w-[300px] border border-gray-200 rounded-2xl transition hover:shadow-lg bg-white hover:bg-slate-200 hover:border-purple-500 flex flex-col justify-between "
            >
              <div className="mb-4 flex justify-between items-center">
                <img
                  src={userProfile}
                  alt="userProfile"
                  className="border-2 border-green-400 w-10 h-10 rounded-full"
                />
                <div className="flex gap-2">
                  {/* <FaTrashAlt
                    onClick={() => handleDelete(val._id)}
                    className="text-black w-6 h-6 hover:bg-black hover:text-white mt-1 cursor-pointer"
                  /> */}
                  {/* <Link to={`/create/${val._id}`}>
                    <FaUserEdit className="text-black w-8 h-8" />
                  </Link> */}
                </div>
              </div>
              <h4 className="text-base font-semibold text-gray-900 mb-2 capitalize truncate">
                {val.title?.slice(0, 15)}
              </h4>
              <p className="overflow-hidden text-sm font-normal h-[60px] text-gray-500 leading-5 mb-4">
                {val.description?.slice(0, 120)} ...
              </p>
              <div className="flex justify-between items-center mt-auto">
                <Link
                  to="/product"
                  className="rounded-full py-2 px-3 text-xs text-white font-semibold border-pink-500 border-2 bg-orange-500 hover:bg-orange-600 transition"
                >
                  Read more..
                </Link>
                <p className="rounded-full py-2 px-3 text-xs text-black font-semibold border-pink-500 border-2">
                  {val.name?.trim()?.slice(0, 10)}..
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
