
import {  useSelector } from 'react-redux'
import Footer from './component/common/Footer'
import NavBar from './component/common/NavBar'
import Sidebar from './component/common/Sidebar'
import { Outlet } from 'react-router-dom'

export default function App() {
  const isOpened = useSelector((state:any) => state.states.isOpenDropDown)
  
  return (
    <div>
      <NavBar/>
      {
        isOpened && <Sidebar/> 
      }
      {/* <Cards/> */}
      <Outlet/>
      <div className='fixed bg-white bottom-0 justify-center items-center flex w-full border-t border-solid border-prime-gray-200   '>
        <Footer/>
      </div>
    </div>
  )
}

