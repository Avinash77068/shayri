import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setIsOpenDropDown } from '../../store/slice/slice'
import { Link } from "react-router-dom"
import api from '../../utils/api'
import { setAllUser } from "../../store/slice/AllUser"
export default function NavBar() {
  const isOpened = useSelector((state: any) => state.states.isOpenDropDown)
  const dispatch=useDispatch()
  const [isopen, setIsOpen] = useState(false)
 const Submit=()=>{
  const dispatch=useDispatch()
  
  useEffect(() => {
    api.get('/login').then(res =>{dispatch(setAllUser(res.data))} ).catch(err => console.log(err))
     
}, [])
 }

  return (
    <nav className="fixed border-b border-solid border-prime-gray-200 w-full py-3 bg-blue-400 z-10 bg-white" >
      <div className="container mx-auto w-full px-[3.81%] sm:px-[0px] ">
        <div className="w-full flex  flex-col lg:flex-row">
          <div className=" flex justify-between  lg:flex-row">
            <span className="flex items-center">
              <img onClick={() => dispatch(setIsOpenDropDown(!isOpened))} className="w-10 h-10 rounded-full" src="data:image/png;base64,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" />
              <p onClick={() => dispatch(setIsOpenDropDown(!isOpened))} className="italic font-[600] pl-4">Avinash</p>
            </span>
            <button data-collapse-toggle="navbar-default-with-dropdown" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-black rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default-with-dropdown" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div className="hidden w-full lg:flex lg:pl-11 " id="navbar-default-with-dropdown">
            <ul className="flex lg:items-center flex-col mt-4 lg:mt-0 lg:ml-auto lg:flex-row gap-4 lg:gap-0">
            <li >
                <Link to="/" className="flex items-center justify-between text-black text-sm lg:text-base font-bold hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3 ">Home</Link>
              </li>
              <li >
                <Link to="/login" className="flex items-center justify-between text-black text-sm lg:text-base font-bold hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3 " onClick={()=>Submit}>Login</Link>
              </li>
              <li >
                <Link to="/signUp" className="flex items-center justify-between text-black text-sm lg:text-base font-bold hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3">Sign Up</Link>
              </li>
              <li className="relative">
                <button onClick={() => setIsOpen(!isopen)}
                  data-target="dropdown-default" className="dropdown-toggle flex items-center lg:justify-between text-black text-sm lg:text-base font-bold hover:text-prime-blue-700 transition-all duration-500 lg:mb-0 lg:mr-6  mr-auto text-left  ">Details <svg className="w-3 h-2 ml-1.5 " width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L3.58579 3.58579C4.25245 4.25245 4.58579 4.58579 5 4.58579C5.41421 4.58579 5.74755 4.25245 6.41421 3.58579L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>

                {
                  isopen && <div id="dropdown-default" className="dropdown-menu rounded-xl lg:shadow-lg lg:bg-white relative lg:absolute top-full w-max mt-3 open" aria-labelledby="dropdown-default">
                    <ul className="py-2">
                      <li>
                        <Link className="block px-6 py-2 hover:bg-gray-100 text-black font-bold" to="hi"> Downloads </Link>
                      </li>
                      <li>
                        <Link className="block px-6 py-2 hover:bg-gray-100 text-black font-bold" to="hi"> Saved Files </Link>
                      </li>
                      <li>
                        <Link className="block px-6 py-2 hover:bg-gray-100 text-black font-bold" to="hi"> Notifications </Link>
                      </li>
                      <li>
                        <Link className="block px-6 py-2 hover:bg-gray-100 text-red-500 font-bold" to="hi"> Log Out </Link>
                      </li>
                    </ul>
                  </div>
                }
              </li>

            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
