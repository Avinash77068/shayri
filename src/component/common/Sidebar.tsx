import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setIsOpenDropDown } from "../../store/slice/slice"
import Popup from "../Global/Popup"
import { useState } from "react"
import { Toaster } from "../Global/Toaster"

const menuItems = [
  {
    to: "/create", label: "Upload", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M8.1475 12.6968L9.99935 10.8333L11.8512 12.6968M9.99935 17.5V10.8795M5.36972 13.6805H4.92701C3.12601 13.6805 1.66602 12.2205 1.66602 10.4196C1.66602 8.61855 3.12601 7.15855 4.92701 7.15855V7.15855C5.17151 7.15855 5.36753 6.95973 5.39031 6.71629C5.61168 4.35087 7.59071 2.5 9.99935 2.5C12.5562 2.5 14.629 4.5857 14.629 7.15855H15.0717C16.8727 7.15855 18.3327 8.61855 18.3327 10.4196C18.3327 12.2205 16.8727 13.6805 15.0717 13.6805H14.629" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  },
  {
    to: "/", label: "Home", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g>
          <path d="M2.5 5.41667C2.5 3.80584 3.80584 2.5 5.41667 2.5C7.0275 2.5 8.33333 3.80584 8.33333 5.41667C8.33333 7.0275 7.0275 8.33333 5.41667 8.33333C3.80584 8.33333 2.5 7.0275 2.5 5.41667Z" stroke="#6B7280" strokeWidth="1.6" />
          <path d="M11.6667 5.41667C11.6667 4.24628 11.6667 3.66109 11.9476 3.24072C12.0691 3.05873 12.2254 2.90248 12.4074 2.78088C12.8278 2.5 13.4129 2.5 14.5833 2.5C15.7537 2.5 16.3389 2.5 16.7593 2.78088C16.9413 2.90248 17.0975 3.05873 17.2191 3.24072C17.5 3.66109 17.5 4.24628 17.5 5.41667C17.5 6.58705 17.5 7.17224 17.2191 7.59262C17.0975 7.7746 16.9413 7.93085 16.7593 8.05245C16.3389 8.33333 15.7537 8.33333 14.5833 8.33333C13.4129 8.33333 12.8278 8.33333 12.4074 8.05245C12.2254 7.93085 12.0691 7.7746 11.9476 7.59262C11.6667 7.17224 11.6667 6.58705 11.6667 5.41667Z" stroke="#6B7280" strokeWidth="1.6" />
          <path d="M11.6667 14.5833C11.6667 12.9725 12.9725 11.6667 14.5833 11.6667C16.1942 11.6667 17.5 12.9725 17.5 14.5833C17.5 16.1942 16.1942 17.5 14.5833 17.5C12.9725 17.5 11.6667 16.1942 11.6667 14.5833Z" stroke="#6B7280" strokeWidth="1.6" />
          <path d="M2.5 14.5833C2.5 13.4129 2.5 12.8278 2.78088 12.4074C2.90248 12.2254 3.05873 12.0691 3.24072 11.9476C3.66109 11.6667 4.24628 11.6667 5.41667 11.6667C6.58705 11.6667 7.17224 11.6667 7.59262 11.9476C7.7746 12.0691 7.93085 12.2254 8.05245 12.4074C8.33333 12.8278 8.33333 13.4129 8.33333 14.5833C8.33333 15.7537 8.33333 16.3389 8.05245 16.7593C7.93085 16.9413 7.7746 17.0975 7.59262 17.2191C7.17224 17.5 6.58705 17.5 5.41667 17.5C4.24628 17.5 3.66109 17.5 3.24072 17.2191C3.05873 17.0975 2.90248 16.9413 2.78088 16.7593C2.5 16.3389 2.5 15.7537 2.5 14.5833Z" stroke="#6B7280" strokeWidth="1.6" />
        </g>
      </svg>
    )
  },
]

const settingsItems = [
  {
    to: "/alluser", label: "AllUser", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M1.98739 14.8333L4.89324 11.7046C5.41043 11.0724 5.66903 10.7564 6.00782 10.7194C6.06155 10.7135 6.11572 10.7129 6.16957 10.7176C6.50912 10.7467 6.77489 11.0568 7.30642 11.6769C7.85881 12.3214 8.13501 12.6436 8.48418 12.6671C8.53942 12.6708 8.59488 12.669 8.64976 12.6617C8.99667 12.6156 9.25131 12.276 9.76059 11.597L10.9672 9.98818C11.5917 9.15555 11.9039 8.73923 12.3266 8.74415C12.7493 8.74906 13.0518 9.17253 13.6568 10.0195L16.5 14M16.5 14V8.16667C16.5 5.02397 16.5 3.45262 15.5237 2.47631C14.5474 1.5 12.976 1.5 9.83333 1.5H8.16667C5.02397 1.5 3.45262 1.5 2.47631 2.47631C1.5 3.45262 1.5 5.02397 1.5 8.16667V9.83333C1.5 12.976 1.5 14.5474 2.47631 15.5237C3.45262 16.5 5.02397 16.5 8.16667 16.5H14C15.3807 16.5 16.5 15.3807 16.5 14ZM9 6.5C9 7.42047 8.25381 8.16667 7.33333 8.16667C6.41286 8.16667 5.66667 7.42047 5.66667 6.5C5.66667 5.57953 6.41286 4.83333 7.33333 4.83333C8.25381 4.83333 9 5.57953 9 6.5Z" stroke="#6B7280" strokeWidth="1.6" />
      </svg>
    ), onClick: (dispatch: any) => dispatch(setIsOpenDropDown(false))
  },
  {
     to: "/",label: "News", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5.83333 15C3.99238 15 2.5 13.5076 2.5 11.6667V8.75C2.5 6.01043 2.5 4.64065 3.25663 3.71869C3.39515 3.54991 3.54991 3.39515 3.71869 3.25663C4.64065 2.5 6.01043 2.5 8.75 2.5H11.6667C13.5076 2.5 15 3.99238 15 5.83333M11.6667 17.5C9.3259 17.5 8.15551 17.5 7.31477 16.9382C6.9508 16.695 6.6383 16.3825 6.3951 16.0186C5.83333 15.1778 5.83333 14.0074 5.83333 11.6667C5.83333 9.3259 5.83333 8.15551 6.3951 7.31477C6.6383 6.9508 6.9508 6.6383 7.31477 6.3951C8.15551 5.83333 9.3259 5.83333 11.6667 5.83333C14.0074 5.83333 15.1778 5.83333 16.0186 6.3951C16.3825 6.6383 16.695 6.9508 16.9382 7.31477C17.5 8.15551 17.5 9.3259 17.5 11.6667C17.5 14.0074 17.5 15.1778 16.9382 16.0186C16.695 16.3825 16.3825 16.695 16.0186 16.9382C15.1778 17.5 14.0074 17.5 11.6667 17.5ZM10.1389 11.6666C10.1389 10.4583 10.1389 9.85413 10.5143 9.60722C10.5413 9.58945 10.5693 9.57327 10.5982 9.55876C10.9998 9.35711 11.523 9.65919 12.5694 10.2634C13.6159 10.8675 14.1391 11.1696 14.1653 11.6182C14.1671 11.6505 14.1671 11.6828 14.1653 11.7151C14.1391 12.1637 13.6159 12.4658 12.5694 13.0699C11.523 13.6741 10.9998 13.9762 10.5982 13.7745C10.5693 13.76 10.5413 13.7438 10.5143 13.7261C10.1389 13.4792 10.1389 12.875 10.1389 11.6666Z" stroke="#6B7280" strokeWidth="1.6" />
      </svg>
    )
  },
  {
    to: "/", label: "Profile", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5.5 16C5.5 13.9289 7.51472 12.25 10 12.25C12.4853 12.25 14.5 13.9289 14.5 16M12.25 7.75C12.25 8.99264 11.2426 10 10 10C8.75736 10 7.75 8.99264 7.75 7.75C7.75 6.50736 8.75736 5.5 10 5.5C11.2426 5.5 12.25 6.50736 12.25 7.75ZM17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" stroke="#6B7280" strokeWidth="1.6" />
      </svg>
    )
  },
  {
    to: "/", label: "Settings", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6.89302 7.67903C6.89302 8.12086 7.2512 8.47903 7.69302 8.47903C8.13485 8.47903 8.49302 8.12086 8.49302 7.67903H6.89302ZM9.41044 11.9928C9.41044 12.4346 9.76861 12.7928 10.2104 12.7928C10.6523 12.7928 11.0104 12.4346 11.0104 11.9928H9.41044ZM9.97915 13.7854C9.53732 13.7854 9.17915 14.1436 9.17915 14.5854C9.17915 15.0273 9.53732 15.3854 9.97915 15.3854V13.7854ZM10.0208 15.3854C10.4626 15.3854 10.8208 15.0273 10.8208 14.5854C10.8208 14.1436 10.4626 13.7854 10.0208 13.7854V15.3854ZM16.7 10C16.7 13.7003 13.7003 16.7 10 16.7V18.3C14.584 18.3 18.3 14.584 18.3 10H16.7ZM10 16.7C6.29969 16.7 3.3 13.7003 3.3 10H1.7C1.7 14.584 5.41604 18.3 10 18.3V16.7ZM3.3 10C3.3 6.29969 6.29969 3.3 10 3.3V1.7C5.41604 1.7 1.7 5.41604 1.7 10H3.3ZM10 3.3C13.7003 3.3 16.7 6.29969 16.7 10H18.3C18.3 5.41604 14.584 1.7 10 1.7V3.3ZM8.49302 7.67903C8.49302 7.14654 8.68796 6.80331 8.93991 6.58348C9.20767 6.34985 9.58974 6.21456 10 6.21456C10.4103 6.21456 10.7923 6.34985 11.0601 6.58348C11.312 6.80331 11.507 7.14654 11.507 7.67903H13.107C13.107 6.70187 12.7252 5.91287 12.112 5.37787C11.5146 4.85667 10.7432 4.61456 10 4.61456C9.25677 4.61456 8.48535 4.85667 7.888 5.37787C7.27483 5.91287 6.89302 6.70187 6.89302 7.67903H8.49302ZM11.507 7.67903C11.507 8.07278 11.4159 8.2976 11.308 8.46417C11.1782 8.66443 11.0054 8.81873 10.7151 9.08755C10.4468 9.33601 10.1005 9.6662 9.83713 10.1449C9.56679 10.6362 9.41044 11.2306 9.41044 11.9928H11.0104C11.0104 11.4613 11.1162 11.1393 11.2389 10.9162C11.3686 10.6805 11.5464 10.4984 11.8023 10.2614C12.0362 10.0449 12.3874 9.74064 12.6508 9.33412C12.936 8.89392 13.107 8.36372 13.107 7.67903H11.507ZM9.97915 15.3854H10.0208V13.7854H9.97915V15.3854Z" fill="#6B7280" />
      </svg>
    )
  },
  {
    label: "Logout", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M9.16667 17.5L5.83333 17.5V17.5C3.98765 17.5 2.5 16.0123 2.5 14.1667V14.1667L2.5 5.83333V5.83333C2.5 3.98765 3.98765 2.5 5.83333 2.5V2.5L9.16667 2.5M8.22814 10L17.117 10M14.3393 6.66667L17.0833 9.41074C17.3611 9.68852 17.5 9.82741 17.5 10C17.5 10.1726 17.3611 10.3115 17.0833 10.5893L14.3393 13.3333" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
]

export default function Sidebar() {
  const isOpened = useSelector((state: any) => state.states.isOpenDropDown)
  const dispatch = useDispatch()
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      {/* Blur overlay for mobile when sidebar is open */}
      {!isOpened && (
        <div onClick={()=>dispatch(setIsOpenDropDown(true))} className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm transition-all duration-500 sm:hidden"></div>
      )}
      <div
        className={`z-10 transition-transform duration-800 mt-[3.5rem] sm:mt-[4rem] p-2 bg-blue-400 text-white h-full flex-col gap-5 inline-flex border-r fixed w-[16rem] ${isOpened ? "translate-x-0" : "translate-x"
          }`}
      >
        {/* User Info */}
        <div className="w-full p-3 rounded-lg border border-gray-300 flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="rounded-full w-8 h-8 border-fuchsia-500 border-2"
              alt="Ronald image"
              src="data:image/png;base64,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"
            />
            <div className="flex-col inline-flex ml-2.5">
              <h2 className="text-gray-700 text-sm font-semibold leading-snug">
                Avinash
              </h2>
              <h6 className="text-black/20 text-xs font-normal leading-4">
                avinash@gmaill.com
              </h6>
            </div>
          </div>
          <button className="w-5 h-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0156 14.9896V15.0396M10.0156 9.97595V10.026M10.0156 4.96228V5.01228"
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        {/* Menu */}
        <div className="w-full">
          <div className="w-full h-8 px-3 flex items-center">
            <h6 className="text-black text-xs font-bold leading-4">MENU</h6>
          </div>
          <ul className="flex-col gap-1 flex">
            {menuItems.map((item) => (
              <li key={item.label} className="hover:bg-green-100 rounded-lg"  onClick={() => dispatch(setIsOpenDropDown(true))}>
                <Link
                  to={item.to}
                  className="flex p-3 bg-white rounded-lg items-center gap-3"
                 
                >
                  {item.icon}
                  <span className="text-black text-sm font-bold leading-snug">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Settings */}
        <div className="w-full flex-col flex">
          <div className="h-8 px-3 items-center inline-flex">
            <h6 className="text-black text-xs font-bold leading-4">SETTINGS</h6>
          </div>
          <ul className="flex-col gap-1 flex">
            {settingsItems.map((item) => (
              <li
                key={item.label}
               
                className={`hover:bg-green-100 rounded-lg ${item.label === "Logout" ? "hover:bg-red-200" : ""
                  }`}
              >
                {item.label === "Logout" ? (
                  <button
                    type="button"
                    className="flex p-3 rounded-lg items-center gap-3 w-full bg-transparent"
                    onClick={() => setShowPopup(true)}
                  >
                    {item.icon}
                    <span className="text-black text-sm font-bold leading-snug">
                      {item.label}
                    </span>
                  </button>
                ) : item.to ? (
                  <Link
                    to={item.to}
                    onClick={
                      item.onClick ? () =>{ item.onClick(dispatch), dispatch(setIsOpenDropDown(true))} : undefined
                    }
                    className="flex p-3 rounded-lg items-center gap-3"
                  >
                    {item.icon}
                    <span className="text-black text-sm font-bold leading-snug">
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <div className="flex p-3 rounded-lg items-center gap-3">
                    {item.icon}
                    <span className="text-black text-sm font-bold leading-snug">
                      {item.label}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        {showPopup && (
          <Popup
            message="Are you sure you want to logout?"
            onClose={() => setShowPopup(false)}
            onConfirm={() => {
              setShowPopup(false)
              Toaster({ message: "Logout successful.", type: "success" });
            }}
            onCancel={() => {
              setShowPopup(false)
            }}
            button1Text="Logout"
            button2Text="Cancel"
            type="error" // options: success | error | warning | info
          />

        )}
      </div>
    </>
  );
}
