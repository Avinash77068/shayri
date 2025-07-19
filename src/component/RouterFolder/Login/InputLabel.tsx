
import {LoginProps} from "../../../@typeScript/Login";

export default function InputLabel({
  labels,
  placeholder,
  id,
  type,
  value,
  onChange,
}: LoginProps) {

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
          {labels} <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </>
  );
}
