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
import SearchPage from './Search'

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' 
        loader={async ()=> {
          const response = await fetch('http://localhost:4000/api/v1/order/recentorders')
          return await response.json();
        }}
        element={<App />} />
      <Route path='/post' element={<PostItem />}></Route>
      <Route path='/post' element={<ItemView order={orders[0]} orders={orders} />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route 
        path='/search' 
        element={<SearchPage />}
        loader={async ({request}) => {
          const results = await fetch(`http://localhost:4000/api/v1/order/recentorders`)
          return (results.status == 400) ? results.json() : null
        }}
      />
      <Route 
        path='/orders/:id' 
        element={<ItemView />}
      loader={async ({params})=> {
          const response = await fetch(`http://localhost:4000/api/v1/order/${params.id}`)
          const additional = await fetch(`http://localhost:4000/api/v1/order/similarorders/${params.id}`)
          return {order: await response.json(), similar: await additional.json()}
        }}
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
