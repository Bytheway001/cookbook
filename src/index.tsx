


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { routes } from './routes';
import { Navigation } from './components/Navigation';
import { Ingredients } from './pages/ingredients/Ingredients';
import { Container } from 'react-bootstrap';
import { Cocina } from './views/Cocina';


const root = ReactDOM.createRoot(document.getElementById('root')!);
const router = createBrowserRouter(routes)
root.render(

    <BrowserRouter>
     
        <Routes>
          <Route path="/" element={<Cocina />} />
          <Route path="/ingredients" element={<Ingredients />}></Route>
        </Routes>
  
    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

