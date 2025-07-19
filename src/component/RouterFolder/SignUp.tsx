import { useState } from "react";
import { SignUpFormData, SignUpErrors } from "../../@typeScript/SignUp";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { setLoader } from "../../store/slice/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenDropDown } from "../../store/slice/slice";

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
    category: "",
    bioMessage: "",
  });
  const isOpened = useSelector((state: any) => state.states.isOpenDropDown);
  const [errors, setErrors] = useState<SignUpErrors>({});
  const loader = useSelector((state: any) => state.thirdState.loader);
  const dispatch = useDispatch();

  const validate = () => {
    let newErrors: SignUpErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/.test(
        formData.email
      )
    ) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.category) newErrors.category = "Please select an option";
    if (!formData.bioMessage?.trim())
      newErrors.bioMessage = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully");

      api
        .post("/user/", {
          email: formData.email,
          category: formData.category,
          username: formData.username,
          password: formData.password,
          bioMessage: formData.bioMessage,
        })
        .then((response) => {
          console.log(response);
        });

      dispatch(setLoader(true)); // Loader ON

      setTimeout(() => {
        navigate("/alluser"); // Navigate after 4 seconds
        dispatch(setIsOpenDropDown(false));
        dispatch(setLoader(false)); // Loader OFF after navigation
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="dark:bg-gradient-to-l from-gray-900 to-gray-600 flex justify-center items-center w-screen p-2 absolute top-[5rem]">
        <div className="bg-white border shadow-md dark:shadow-gray-600 rounded px-8 pt-6 pb-4 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
          <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">
            Sign Up
          </h1>
          <div className="flex gap-x-5">
            <div className="mb-3 w-full">
              <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                UserName *
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                type="text"
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs">{errors.username}</p>
              )}
            </div>
            <div className="mb-3 w-full">
              <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                Email *
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                type="email"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="sm:flex gap-x-5 block">
            <div className="mb-3 w-full">
              <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                Password *
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>
            <div className="mb-3 w-full">
              <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                Select an option *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Choose a Type</option>
                <option value="Sad">Sad</option>
                <option value="Happy">Happy</option>
                <option value="Love">Love</option>
                <option value="Attitude">Attitude</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs">{errors.category}</p>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
              Bio Message *
            </label>
            <textarea
              name="bioMessage"
              value={formData.bioMessage}
              onChange={handleChange}
              className="py-4 border px-4 block w-full border-gray-200 rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
            {errors.bioMessage && (
              <p className="text-red-500 text-xs">{errors.bioMessage}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded dark:bg-green-600"
              type="submit"
            >
              {loader ? (
                <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-red-600 rounded-full dark:text-blue-500"></div>
              ) : (
                "SingUP"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
