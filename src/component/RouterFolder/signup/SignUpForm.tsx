import React, { useState } from "react";
import { SignUpErrors, SignUpFormData } from "../../../@typeScript/SignUp";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface Props {
  formData: SignUpFormData;
  errors: SignUpErrors;
  loader: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const SignUpForm: React.FC<Props> = ({
  formData,
  errors,
  loader,
  handleChange,
  handleSubmit,
}) => {
  const user = useSelector((state: any) => state.allUser.AllUser);
  const params = useParams();
  const selectedUser = user?.data?.filter((item: any) => item._id === params.id);
  const FilterUser = selectedUser?.length > 0 ? selectedUser[0] : null;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <div className="dark:bg-gradient-to-l h-screen from-gray-900 to-gray-600 flex justify-center items-center absolute w-full">
        <div className="bg-white border shadow-md dark:shadow-gray-600 rounded-2xl m-2 sm:m-0 px-4 sm:px-8 pt-6 pb-4 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
          <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">
            {FilterUser ? "Update User" : "Sign Up"}
          </h1>

          <div className="flex gap-x-5">
            {/* Username */}
            <div className="mb-3 w-full">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-400">
                UserName *
              </label>
              <input
                name="username"
                value={FilterUser ? FilterUser.username : formData.username}
                onChange={handleChange}
                className="input"
                type="text"
                placeholder="Username"
              />
              {FilterUser ? errors.username && <p className="text-red-500 text-xs">{errors.username}</p> : errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
            </div>

            {/* Email */}
            <div className="mb-3 w-full">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-400">
                Email *
              </label>
              <input
                name="email"
                value={FilterUser ? FilterUser.email : formData.email}
                onChange={handleChange}
                className="input"
                type="email"
                placeholder="Email"
              />
              {FilterUser ? errors.email && <p className="text-red-500 text-xs">{errors.email}</p> : errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
          </div>

          <div className="sm:flex gap-x-5 block">
            {/* Password */}
            <div className="mb-3 w-full">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-400">
                Password *
              </label>
              <div className="relative">
                <input
                  name="password"
                  value={FilterUser ? FilterUser.password : formData.password}
                  onChange={handleChange}
                  className="input pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {FilterUser ? errors.password && <p className="text-red-500 text-xs">{errors.password}</p> : errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            {/* Category (as horizontal scroll buttons) */}
            <div className="mb-3 w-full">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-400">
                Select an option *
              </label>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {["Sad", "Happy", "Love", "Attitude"].map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() =>
                      handleChange({
                        target: { name: "category", value: option },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border ${
                      (FilterUser && FilterUser.category === option) ||
                      formData.category === option
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {FilterUser ? errors.category && <p className="text-red-500 text-xs">{errors.category}</p> : errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
            </div>
          </div>

          {/* Bio Message */}
          <div className="mb-3">
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-400">
              Bio Message *
            </label>
            <textarea
              name="bioMessage"
              value={FilterUser ? FilterUser.bioMessage : formData.bioMessage}
              onChange={handleChange}
              className="textarea"
            />
            {FilterUser ? errors.bioMessage && <p className="text-red-500 text-xs">{errors.bioMessage}</p> : errors.bioMessage && <p className="text-red-500 text-xs">{errors.bioMessage}</p>}
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between">
            <button className="submit-button" type="submit">
              {loader ? (
                <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full" />
              ) : FilterUser ? (
                "Update"
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
