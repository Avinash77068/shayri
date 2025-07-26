
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import store from './store/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './component/RouterFolder/Login/Login'
import Cards from './component/common/Cards'
import SignUp from './component/RouterFolder/signup/SignUp'
import PageNot from './component/RouterFolder/PageNot'
import ProductDetails from './component/RouterFolder/ProductDetails'
import UploadShayri from './component/RouterFolder/Upload/UploadShayri'
import AllUser from './component/UserRouter/AllUser'
import { ToastContainer } from 'react-toastify'
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })


let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Cards /> },

      { path: "/login", element: <Login /> },
      { path: "/signUp", element: <SignUp /> },
      { path: '/product/:id?', element: <ProductDetails /> },
      { path: "/create/:id?", element: <UploadShayri /> },
      { path: "/alluser", element: <AllUser /> },
      { path: "*", element: <PageNot /> },
    ]
  }
]
)

const root = createRoot(document.getElementById('root')!)
root.render(
  <>
    <ToastContainer/>
    <Provider store={store}>
      <RouterProvider router={router}  />
    </Provider>
   
  </>
)