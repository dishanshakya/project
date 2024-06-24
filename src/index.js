import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import App from './App';
import ItemView from './Item';
import PostItem from './Post';
import { Login, SignUp } from './Login';
import { orders } from './imgResources';
import './App.css';
import './Item.css'
import './login.css'
import { ErrorPage } from './ErrorPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} />
      <Route path='/post' element={<PostItem />}></Route>
      <Route path='/post' element={<ItemView order={orders[0]} orders={orders} />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route 
        path='/orders/:id' 
        element={<ItemView orders={orders} />}
        loader={({params})=> orders.find((element)=> element.id == params.id)} 
        errorElement={<ErrorPage />}
      />
    </>
  )
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
