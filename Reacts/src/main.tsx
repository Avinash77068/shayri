import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App  from './App'
import store from './store/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './component/RouterFolder/Login'
import Cards from './component/common/Cards'
import SignUp from './component/RouterFolder/SignUp'
import PageNot from './component/RouterFolder/PageNot'


let router= createBrowserRouter([
  {
  path:"/",
  element:<App/>,
  children:[
   
    {path:"/" ,element:<Cards/>},
   
    {path:"/login" ,element:<Login/>},
    {path:"/signUp" ,element:<SignUp/>},
    {path:"*" ,element:<PageNot/>},
  ]
  }
]
)

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <>
    <Provider store={store}>
      <RouterProvider router={router}>
        
      </RouterProvider>
     
    </Provider>
    </>
  </React.StrictMode>,
)