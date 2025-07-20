import {  useState } from "react";
import InputLabel from "./InputLabel";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../store/slice/Loader";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector((state: any) => state.thirdState.loader);

  const [AllData, setAllData] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async () => {
    // 1. Validate empty fields
    if (!AllData.email || !AllData.password) {
      toast.error("Email and Password should not be empty");
      return;
    }

    // 2. Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(AllData.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // 3. Call API
    try {
      dispatch(setLoader(true));
      const result = await api.post("/login", {
        email: AllData.email,
        password: AllData.password,
      });

      console.log("API result:", result);

      if (result.data?.success) {
        toast.success("Login successful!");
        console.log("Navigating...");
        navigate("/");
        dispatch(setLoader(false));
      } else {
        toast.error(result.data?.message || "Incorrect Email or Password");
        dispatch(setLoader(false));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Incorrect Email or Password");
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="dark:bg-gradient-to-l from-gray-900 to-gray-600 flex justify-center items-center w-screen h-screen p-5">
      <div className="bg-white border shadow-md dark:shadow-gray-600 rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">
          Login
        </h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <InputLabel
            labels="Email"
            id="email"
            type="email"
            placeholder="Enter Email here"
            value={AllData.email}
            onChange={(e) =>
              setAllData((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <InputLabel
            labels="Password"
            id="password"
            type="password"
            placeholder="Enter Password here"
            value={AllData.password}
            onChange={(e) =>
              setAllData((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <div className="flex items-center justify-between mt-4">
            <button
              className="bg-green-500 flex justify-center items-center p-2 hover:bg-green-700 text-white w-full font-bold rounded focus:outline-none focus:shadow-outline dark:bg-green-600"
              type="button"
              onClick={HandleSubmit}
              disabled={loader}
            >
              {loader ? (
                <div className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-white rounded-full"></div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
