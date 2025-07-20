import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setIsOpenDropDown } from '../../store/slice/slice'
import { Link } from "react-router-dom"
import logo from  '../../assets/shayri.jpg'
export default function NavBar() {
  const isOpened = useSelector((state: any) => state.states.isOpenDropDown)
  const dispatch = useDispatch()
  const [isopen, setIsOpen] = useState(false)

  return (
    <nav className="fixed border-b border-solid border-prime-gray-200 bg-blue-400 w-full p-2 lg:py-3 z-10">
      <div className="px-5 w-full bg-blue-400 ">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="flex justify-between lg:flex-row">
            <span className="flex items-center">
              <img onClick={() => dispatch(setIsOpenDropDown(!isOpened))} className="w-10 h-10 rounded-full" src={logo} />
              <p onClick={() => dispatch(setIsOpenDropDown(!isOpened))} className="italic font-[600] pl-4">Avinash</p>
            </span>
            <button data-collapse-toggle="navbar-default-with-dropdown" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-black rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default-with-dropdown" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <div className="hidden w-full lg:flex  gap-4 lg:items-center justify-end" id="navbar-default-with-dropdown">
            <ul className="flex items-center justify-end gap-8 text-xl">
              <li>
                <Link to="/" className="flex items-center text-black transition-all duration-500 mb-2 font-bold">Home</Link>
              </li>
              <li>
                <Link to="/login" className="flex items-center text-black transition-all duration-500 mb-2 font-bold">Login</Link>
              </li>
              <li>
                <Link to="/signUp" className="flex items-center text-black transition-all duration-500 mb-2 font-bold">Sign Up</Link>
              </li>
              </ul>
              <ul>
              <li className="relative">
                <button onClick={() => setIsOpen(!isopen)} className="dropdown-toggle flex items-center text-black transition-all duration-500 mb-2 font-bold hover:text-prime-blue-700 transition-all text-xl duration-500 px-6">Details <svg className="w-3 h-2 ml-1.5" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L3.58579 3.58579C4.25245 4.25245 4.58579 4.58579 5 4.58579C5.41421 4.58579 5.74755 4.25245 6.41421 3.58579L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
                {isopen && (
                  <div className="dropdown-menu rounded-xl  lg:shadow-lg lg:bg-white absolute right-0 mt-3 open z-20">
                    <ul className="py-2">
                      <li><Link className="block px-6 py-2 hover:bg-gray-100 text-black font-bold" to="hi">Downloads</Link></li>
                      <li><Link className="block px-6 py-2 hover:bg-gray-100 text-black font-bold" to="hi">Saved Files</Link></li>
                      <li><Link className="block px-6 py-2 hover:bg-gray-100 text-black font-bold" to="hi">Notifications</Link></li>
                      <li><Link className="block px-6 py-2 hover:bg-gray-100 text-red-500 font-bold" to="hi">Log Out</Link></li>
                    </ul>
                  </div>
                )}
              </li>
              </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
