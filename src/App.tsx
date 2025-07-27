import { useSelector } from 'react-redux'
import Footer from './component/common/Footer'
import NavBar from './component/common/NavBar'
import Sidebar from './component/common/Sidebar'
import { Outlet } from 'react-router-dom'
import "./component/Global/global.css"

export default function App() {
  const isOpened = useSelector((state: any) => state.states.isOpenDropDown)

  return (
    <div>
      <NavBar />
      {
        !isOpened && <Sidebar />
      }
  <div
  >
        <Outlet />
  </div>
      <div className='f
      ixed bg-white bottom-0  items-center flex w-full   '>
        <Footer />
      </div>
    </div>
  )
}

