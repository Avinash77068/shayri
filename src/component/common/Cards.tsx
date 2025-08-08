import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setAllData } from "../../store/slice/DataSlice";
import api from "../../utils/api";
import Loader from "../Global/Loader";
import userProfile from "../../assets/image/avinash.jpg";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { val } from "../../@typeScript/TypeScriptCollection";
import Popup from "../Global/Popup";
import { setAllUser } from "../../store/AllUser/AllUser";


export default function Cards() {
  const Alldata = useSelector((state: any) => state.alldata.AllData);
  const isOpened = useSelector((state: any) => state.states.isOpenDropDown);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const loginUser = useSelector((state: any) => state.loginUser.loginUser);
  // const allUser=useSelector((state:any)=>state.allUser.AllUser)
  // console.log(allUser?.data?.map((item:any)=>item._id),"alluser")
  // console.log(Alldata?.data?.map((i:any)=>i._id),loginUser.auth._id)
  const getAllData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employee");
      console.log(res?.data);
      dispatch(setAllData(res?.data));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getAlluser=async()=>{
    try {
      const res=await api.get("/user/")
      console.log(res?.data)
      dispatch(setAllUser(res?.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllData();
    getAlluser();
  }, []);

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

  const getColorClass = (title: string) => {
    const lower = title?.toLowerCase();
    if (lower.includes("love"))
      return "border-pink-500 bg-pink-100 hover:bg-pink-200";
    if (lower.includes("sad"))
      return "border-blue-500 bg-blue-100 hover:bg-blue-200";
    return "border-gray-300 bg-gray-50 hover:bg-gray-100";
  };

  if (loading) {
    return <Loader fullscreen size="lg" text="Please wait..." color="green" />;
  }

  return (
    <div className="w-full flex justify-center">
      <div
        className={`${
          !isOpened && loginUser ? "lg:ml-[16rem]" : "ml-0"
        } px-2 pt-[5rem] pb-10 w-full max-w-[1600px] transition-all duration-300`}
      >
        {Alldata?.data?.length === 0 ? (
          <div className="text-center text-gray-600 text-2xl font-semibold flex items-center justify-center h-[60vh] w-full">
            No Data Found
          </div>
        ) : (
          <div
            className={`grid gap-2 px-4 sm:px-1 sm:gap-4 md:gap-6 ${
              isOpened && loginUser
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {Alldata?.data?.map((val: val) => {
              const colorClass = getColorClass(val.title);
              return (
                <div
                  key={val._id}
                  className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-xl flex flex-col ${colorClass}`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <img
                      src={val.userProfile || userProfile}
                      alt="profile"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-green-500"
                    />
                    {loginUser?.status && (
                      <div className="flex gap-3">
                        <Link
                          to={`/create/${val._id}`}
                          title="Edit"
                          className="text-blue-600 hover:text-blue-800 text-lg"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          title="Delete"
                          className="text-red-600 hover:text-red-800 text-lg"
                          onClick={() => {
                            setSelectedId(val._id);
                            setShowPopup(true);
                          }}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 truncate capitalize">
                    {val.title}
                  </h3>

                  <p className="text-sm text-gray-700 mb-4 leading-6 line-clamp-4 min-h-[90px]">
                    {val.description}
                  </p>

                  <div className="flex justify-between items-center mt-auto pt-2">
                    <Link
                      to={`/product/${val._id}`}
                      className="text-[10px] sm:text-sm font-semibold px-3 py-1 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
                    >
                      Read more
                    </Link>
                    <span className="text-xs text-black sm:text-sm font-medium px-3 py-1 border border-gray-300 rounded-full">
                      {val.name?.slice(0, 8)}.
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Popup for Confirm Delete */}
      {showPopup && selectedId && (
        <Popup
          title="Confirm Delete"
          message="Are you sure you want to delete this item?"
          onConfirm={() => {
            handleDelete(selectedId);
            setShowPopup(false);
          }}
          onCancel={() => setShowPopup(false)}
          onClose={() => setShowPopup(false)}
          button1Text="Yes, Delete"
          button2Text="Cancel"
          type="error"
        />
      )}
    </div>
  );
}
