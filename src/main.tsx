// main.tsx
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import store, { persistor } from './store/store'; //  Updated
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './component/RouterFolder/Login/Login';
import Cards from './component/common/Cards';
import SignUp from './component/RouterFolder/signup/SignUp';
import PageNot from './component/RouterFolder/PageNot';
import ProductDetails from './component/RouterFolder/ProductDetails';
import UploadShayri from './component/RouterFolder/Upload/UploadShayri';
import AllUser from './component/UserRouter/AllUser';
import { ToastContainer } from 'react-toastify';
import { registerSW } from 'virtual:pwa-register';
import { PersistGate } from 'redux-persist/integration/react'; //  Import

import 'react-toastify/dist/ReactToastify.css';

registerSW({ immediate: true });

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Cards /> },
      { path: "/login", element: <Login /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/product/:id?", element: <ProductDetails /> },
      { path: "/create/:id?", element: <UploadShayri /> },
      { path: "/alluser", element: <AllUser /> },
      { path: "/settings", element: <AllUser /> },
      { path: "*", element: <PageNot /> },
    ],
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> {/*  Persist gate */}
      <RouterProvider router={router} />
      <ToastContainer />
    </PersistGate>
  </Provider>
);
