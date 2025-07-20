import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../utils/api";
import { setLoader } from "../../../store/slice/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function UploadShayri() {
  const loader = useSelector((s: any) => s.thirdState.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const allData = useSelector((s: any) => s.secondStates.AllData);
  const [form, setForm] = useState({ name: "", title: "", description: "" });

  useEffect(() => {
    if (id) {
      const d = allData?.data?.find((i: any) => i._id === id);
      if (d) setForm({ name: d.name || "", title: d.title || "", description: d.description || "" });
    }
  }, [id, allData]);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setLoader(true));
    const method = id ? "put" : "post";
    const url = id ? `/employee/${id}` : "/employee/";
    api[method](url, form)
      .then(() => {
        toast(id ? "Edited Successfully" : "Uploaded Successfully");
        navigate("/");
      })
      .catch(() => {})
      .finally(() => dispatch(setLoader(false)));
  };

  return (
    <div className="flex justify-center items-center w-screen p-2 absolute top-[5rem]">
      <div className="bg-white border shadow-md dark:shadow-gray-600 rounded px-8 pt-6 pb-4 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">
          {id ? "Edit Shayri" : "Upload Shayri"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-6 w-full p-2">
            <input id="name" name="name" value={form.name} onChange={handleChange} className="peer w-full rounded bg-opacity-40 py-1 px-3 text-base leading-8 font-semibold text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-indigo-900 border" placeholder="Name" />
           
          </div>
          <div className="mt-6 w-full p-2">
            <input id="title" name="title" value={form.title} onChange={handleChange} className="peer w-full rounded bg-opacity-40 py-1 px-3 text-base leading-8 font-semibold text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-indigo-900 border" placeholder="Title" />
            
          </div>
          <div className="mt-6 w-full p-2">
            <textarea id="description" name="description" value={form.description} onChange={handleChange} className="peer w-full rounded h-32 bg-opacity-40 py-1 px-3 text-base leading-8 font-semibold text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-indigo-900 border" placeholder="Enter Your Shayri"></textarea>
            
          </div>
          <div className="w-full flex gap-3">
          
          <button className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded dark:bg-green-600" type="submit" disabled={loader}>
            {loader ? <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-red-600 rounded-full dark:text-blue-500"></div> : id ? "Cancle" : "Cancle"}
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded dark:bg-green-600" type="submit" disabled={loader}>
            {loader ? <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-red-600 rounded-full dark:text-blue-500"></div> : id ? "Update" : "Upload"}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
