import { useState } from "react";
import InputLabel from "./InputLabel";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../store/slice/Loader";
import { Toaster } from "../../Global/Toaster";
import { setLoginUser } from "../../../store/slice/Login";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector((state: any) => state.thirdState.loader);

  const [AllData, setAllData] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async () => {
    if (!AllData.email || !AllData.password) {
      Toaster({ message: "Email and Password should not be empty", type: "error" });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(AllData.email)) {
      Toaster({ message: "Please enter a valid email", type: "error" });
      return;
    }

    try {
      dispatch(setLoader(true));
      const result = await api.post("/login", {
        email: AllData.email,
        password: AllData.password,
      });

      console.log("API result:", result);

      if (result.data) {
        console.log(result.data)
        dispatch(setLoginUser(result?.data));
        Toaster({ message: "Login successfully", type: "success" });
        navigate("/");
      } else {
        Toaster({ message: result.data?.message || "Incorrect Email or Password", type: "error" });
      }
    } catch (err: any) {
      Toaster({
        message: err.response?.data?.message || "Incorrect Email or Password",
        type: "error",
      });
    } finally {
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
