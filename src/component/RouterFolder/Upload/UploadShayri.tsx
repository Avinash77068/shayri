import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../utils/api";
import { setLoader } from "../../../store/slice/Loader";
import { useNavigate, useParams } from "react-router-dom";

export default function UploadShayri() {
  const loader = useSelector((state: any) => state.thirdState.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const Alldata = useSelector((state: any) => state.secondStates.AllData);

  // State to store input values
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
  });

  // Populate input fields if id exists
  useEffect(() => {
    if (id) {
      const existingData = Alldata?.data?.find((item: any) => item._id === id);
      if (existingData) {
        setFormData({
          name: existingData.name || "",
          title: existingData.title || "",
          description: existingData.description || "",
        });
      }
    }
  }, [id, Alldata]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoader(true));

    const method = !!id ? "put" : "post";
    const url = !!id ? `/employee/${id}` : "/employee/";

    console.log("API Call:", method.toUpperCase(), url, formData);

    api[method](url, formData)
      .then((response) => {
        alert(id ? "Edited Successfully" : "Uploaded Successfully");
        navigate("/");
        dispatch(setLoader(false));
        console.log(response);
      })
      .catch((error) => {
        dispatch(setLoader(false));
        console.error("API Error:", error);
      });


  };

  return (
    <div className="flex justify-center items-center w-screen p-2 absolute top-[5rem]">
      <div className="bg-white border shadow-md dark:shadow-gray-600 rounded px-8 pt-6 pb-4 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">
          {id ? "Edit Shayri" : "Upload Shayri"}
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mt-6 w-full p-2">
            <div className="relative">
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="peer w-full rounded bg-opacity-40 py-1 px-3 text-base leading-8 font-semibold text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-indigo-900 border"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className="absolute left-3 -top-8 bg-white text-sm leading-7 text-white transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500"
              >
                Name
              </label>
            </div>
          </div>

          {/* Title Input */}
          <div className="mt-6 w-full p-2">
            <div className="relative">
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="peer w-full rounded bg-opacity-40 py-1 px-3 text-base leading-8 font-semibold text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-indigo-900 border"
                placeholder="Title"
              />
              <label
                htmlFor="title"
                className="absolute left-3 -top-8 bg-white text-sm leading-7 text-white transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500"
              >
                Title
              </label>
            </div>
          </div>

          {/* Shayri Textarea */}
          <div className="mt-6 w-full p-2">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="peer w-full rounded h-32 bg-opacity-40 py-1 px-3 text-base leading-8 font-semibold text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-indigo-900 border"
                placeholder="Enter Your Shayri"
              ></textarea>
              <label
                htmlFor="description"
                className="absolute left-3 -top-8 bg-white text-sm leading-7 text-white transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500"
              >
                Shayri
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded dark:bg-green-600"
              type="submit"
              disabled={loader}
            >
              {loader ? (
                <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-red-600 rounded-full dark:text-blue-500"></div>
              ) : (
                id ? "Update" : "Upload"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
