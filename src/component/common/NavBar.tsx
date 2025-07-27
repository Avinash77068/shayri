import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpenDropDown } from "../../store/slice/slice";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/shayri.jpg";
import { FaBars } from "react-icons/fa";

export default function NavBar() {
  const isOpened = useSelector((state: any) => state.states.isOpenDropDown);
  const dispatch = useDispatch();
  const [isopen, setIsOpen] = useState(false);
  const location = useLocation();
  const hideHome = location.pathname === "/";

  const loginUser = useSelector((state: any) => state.loginUser.loginUser); // 👈 Get user
  const isLoggedIn = !!loginUser; // true if user exists

  return (
    <nav className="fixed w-full z-50 bg-blue-400 border-prime-gray-200 p-2 lg:py-3">
      <div className="px-5 flex flex-col lg:flex-row justify-between items-center">
        <div className="flex justify-between items-center w-full lg:w-auto">
          <span
            onClick={() => dispatch(setIsOpenDropDown(!isOpened))}
            className="flex items-center cursor-pointer"
          >
            <img src={logo} className="w-10 h-10 rounded-full" />
            <p className="italic font-semibold pl-4">
              {isLoggedIn ? loginUser.name : "Avinash"}
            </p>
          </span>
          <button
            onClick={() => dispatch(setIsOpenDropDown(!isOpened))}
            className="lg:hidden p-2 ml-3 text-sm text-black rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <FaBars className="text-2xl text-black" />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-8 mt-2 lg:mt-0 text-lg">
          {["Home"]
            .filter((text) => !(text === "Home" && hideHome))
            .map((text, i) => (
              <Link
                key={i}
                to="/"
                className="text-black font-bold transition-all hover:text-blue-700"
              >
                {text}
              </Link>
            ))}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-black font-bold transition-all hover:text-blue-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-black font-bold transition-all hover:text-blue-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/settings"
                className="text-black font-bold transition-all hover:text-blue-700"
              >
                Settings
              </Link>
            </>
          )}

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isopen)}
              className="flex items-center font-bold text-black hover:text-blue-700 px-6"
            >
              Details
              <svg className="w-3 h-2 ml-1.5" viewBox="0 0 10 6" fill="none">
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isopen && (
              <ul className="absolute right-0 mt-3 z-20 bg-white rounded-xl shadow-lg py-2">
                {isLoggedIn ? (
                  <>
                    {["Downloads", "Saved Files", "Notifications"].map(
                      (item, i) => (
                        <li key={i}>
                          <Link
                            to="/hi"
                            className="block px-6 py-2 font-bold text-black hover:bg-gray-100"
                          >
                            {item}
                          </Link>
                        </li>
                      )
                    )}
                    <li>
                      <Link
                        to="/logout"
                        className="block px-6 py-2 font-bold text-red-500 hover:bg-gray-100"
                      >
                        Log Out
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <p className="px-6 py-2 text-gray-500">Login to see more</p>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
