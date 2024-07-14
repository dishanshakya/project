import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import App from './App';
import ItemView from './Item';
import PostItem from './Post';
import { Login, SignUp } from './Login';
import './App.css';
import './Item.css'
import './login.css'
import './cssclass.css'
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
      <Route path='/post' element={<PostItem />}
        loader={async () => {
          const response = await fetch('http://localhost:4000/api/v1/order/categories')
          return await response.json()
        }}
      ></Route>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route 
        path='/search' 
        element={<SearchPage />}
        loader={async ({request}) => {
          const searchString = new URL(request.url).searchParams.get('name')
          const results = await fetch(`http://localhost:4000/api/v1/order/search`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({search: searchString})
          })
          return (results.status == 200) ? results.json() : null
        }}
      />
      <Route 
        path='/orders/:id' 
        element={<ItemView />}
      loader={async ({params})=> {
          const response = await fetch(`http://localhost:4000/api/v1/order/${params.id}`)
          const additional = await fetch(`http://localhost:4000/api/v1/order/similarorders/${params.id}`)
          const comments = await fetch(`http://localhost:4000/api/v1/order/comments/${params.id}`)
          return {order: await response.json(), similar: await additional.json(), comments: await comments.json()}
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
