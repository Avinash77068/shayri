
export default function SignUp() {

    return (

        <div className=" dark:bg-gradient-to-l from-gray-900 to-gray-600 flex justify-center items-center w-screen p-2 absolute top-[5rem]  ">
            <div className="bg-white border shadow-md dark:shadow-gray-600 rounded px-8 pt-6 pb-4 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
                <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200"> SignUp</h1>
                <form>
                    <div className="flex gap-x-5">
                        <div className="mb-3">
                            <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                                UserName <span className="text-red-500">*</span>
                            </label>
                            <input className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" id="email" type="email" placeholder="Email" />
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" id="email" type="email" placeholder="Email" />
                        </div>
                    </div>
                    <div className="sm:flex gap-x-5 block">  <div className="mb-3">
                        <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2" >
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" id="password" type="password" placeholder="******************" />
                    </div>
                        <form className="max-w-sm mx-auto mb-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a Type</option>
                                <option value="Sad">Sad</option>
                                <option value="Happy">Happy</option>
                                <option value="Love">Love</option>
                                <option value="attitude">Attitude</option>
                            </select>
                        </form></div>
                    <div className="mb-3">
                        <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2" >
                            TextBox <span className="text-red-500">*</span>
                        </label>
                        <textarea className="py-4 border px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-green-600" type="button">
                            SignUP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
