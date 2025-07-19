import { useEffect, useState } from "react";
import InputLabel from "./InputLabel";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../store/slice/Loader";

export default function Login() {
  const navigate = useNavigate();
  const [AllApiData, setAllApiData] = useState([]);
  const dispatch=useDispatch()
  const loader = useSelector((state: any) => state.thirdState.loader)
  const [AllData, setAllData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/login")
      .then((result) => {
        setAllApiData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const HandleSubmit = () => {
    setError(""); // Clear previous errors

    // **Step 1: Check for empty fields**
    if (!AllData.email || !AllData.password) {
      setError("Email and Password should not be empty");
      return;
    }

    // **Step 2: Validate email format**
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(AllData.email)) {
      setError("Please enter a valid email");
      return;
    }

    // **Step 3: Match user credentials with API data**
    interface User {
      email: string;
      password: string;
    }
    const user = AllApiData.find(
      (user: User) =>
        user.email === AllData.email.toLowerCase() &&
        user.password === AllData.password
    );

    if (user) {
      dispatch(setLoader(true)); // Loader ON
  
  setTimeout(() => {
    navigate("/"); // Navigate after 4 seconds
    dispatch(setLoader(false)); // Loader OFF after navigation
  }, 4000);
    } else {
      setError("Incorrect Email or Password");
    }
  };
  return (
    <>
  
<div className=" dark:bg-gradient-to-l from-gray-900 to-gray-600 flex justify-center items-center w-screen h-screen p-5">
      <div className="bg-white border shadow-md dark:shadow-gray-600 rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">
          Login
        </h1>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>} {/* Display errors */}
        <form>
          <InputLabel
              labels={"Email"}
              id={"email"}
              type={"email"}
              placeholder={"Enter Email here"}
              onChange={(e) => setAllData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))} value={""}          />
          <InputLabel
              labels={"Password"}
              id={"password"}
              type={"password"}
              placeholder={"Enter Password here"}
              onChange={(e) => setAllData((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))} value={""}          />
          <div className="flex items-center justify-between">
            <button
              className="bg-green-400 flex justify-center items-center p-1 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-green-600"
              type="button"
              onClick={HandleSubmit}
            >
            {
              loader ? <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-red-600 rounded-full dark:text-blue-500" ></div>:'Login' 
            }  


            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  
  );
}
