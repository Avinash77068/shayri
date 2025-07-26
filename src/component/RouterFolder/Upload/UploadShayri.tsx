import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../utils/api";
import { setLoader } from "../../../store/slice/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "../../Global/Toaster";


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
        Toaster({
  message: id ? "Shayri Updated Successfully" : "Shayri Uploaded Successfully",
  type: "success"
});

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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="input"
            />
          </div>
          <div>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="input"
            />
          </div>
          <div>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter Your Shayri"
              className="textarea"
            ></textarea>
          </div>
          <div className="w-full flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="submit-button"
            >
              Cancle
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={loader}
            >
              {loader ? (
                <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full"></div>
              ) : id ? "Update" : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
