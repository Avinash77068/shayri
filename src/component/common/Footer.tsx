import { IoIosContacts } from "react-icons/io";
import { GrServices } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

import { FaSquareInstagram } from "react-icons/fa6";
export default function Footer() {
  return (
   <div>
    <footer className='  z-10 p-4  bg-blue-400 fixed bg-white bottom-0 w-full justify-center flex items-center'>
      <ul className='mt-2 flex gap-7 '>
        <li>Home</li>
        <li className="flex gap-6"><span className="mt-1 w-4 h-4"><IoIosContacts/></span>Contact Us</li>
        <li className="flex gap-6"><span className="mt-1 w-4 h-4"><GrServices/></span>Service</li>
        <li className="flex gap-6"><span className="mt-1 w-4 h-4"><FaFacebook/></span>Facebook</li>
        <li className="flex gap-6"><span className="mt-1 w-4 h-4"><FaSquareInstagram/></span>Instagram</li>
        <li className="flex gap-6"><span className="mt-1 w-4 h-4"><FaTwitter/></span>Twitter</li>
      </ul>
   
      </footer>
   </div>
  )
}
