import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/HomePage/Home.jsx'
import History from './pages/HistoryPage/History.jsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
            {
        path: "history",
        element: <History />,
      },
      {
        path: "/",
        element: <Home/> ,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


