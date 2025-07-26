// src/components/SignUp/SignUpForm.tsx
import React from "react"
import { SignUpErrors, SignUpFormData } from "../../../@typeScript/SignUp"


interface Props {
  formData: SignUpFormData
  errors: SignUpErrors
  loader: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}

const SignUpForm: React.FC<Props> = ({ formData, errors, loader, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="dark:bg-gradient-to-l h-screen from-gray-900 to-gray-600 flex justify-center items-center absolute w-full">
        <div className="bg-white border shadow-md dark:shadow-gray-600 rounded px-8 pt-6 pb-4 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
          <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">Sign Up</h1>

          <div className="flex gap-x-5">
            {/* Username */}
            <div className="mb-3 w-full">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-400">UserName *</label>
              <input name="username" value={formData.username} onChange={handleChange} className="input" type="text" placeholder="Username" />
              {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
            </div>

            {/* Email */}
            <div className="mb-3 w-full">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-400">Email *</label>
              <input name="email" value={formData.email} onChange={handleChange} className="input" type="email" placeholder="Email" />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
          </div>

          <div className="sm:flex gap-x-5 block">
            {/* Password */}
            <div className="mb-3 w-full">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-400">Password *</label>
              <input name="password" value={formData.password} onChange={handleChange} className="input" type="password" placeholder="Password" />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            {/* Category */}
            <div className="mb-3 w-full">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-400">Select an option *</label>
              <select name="category" value={formData.category} onChange={handleChange} className="select">
                <option value="">Choose a Type</option>
                <option value="Sad">Sad</option>
                <option value="Happy">Happy</option>
                <option value="Love">Love</option>
                <option value="Attitude">Attitude</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
            </div>
          </div>

          {/* Bio Message */}
          <div className="mb-3">
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-400">Bio Message *</label>
            <textarea name="bioMessage" value={formData.bioMessage} onChange={handleChange} className="textarea" />
            {errors.bioMessage && <p className="text-red-500 text-xs">{errors.bioMessage}</p>}
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between">
            <button className="submit-button" type="submit">
              {loader ? (
                <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm
