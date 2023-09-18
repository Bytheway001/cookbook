import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cocina } from './views/Cocina';
import { TableDetail } from './pages/TableDetail';
import { Waiter } from './pages/Waiter';
import { Dashboard } from './views/Dashboard';
import { Layout } from './Layout';
import { Report } from './pages/Report';
import { WebSocketProvider } from './websockets/Provider';



const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <WebSocketProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kitchen" element={<Cocina />} />
          <Route path="/table/:id" element={<TableDetail />}></Route>
          <Route path="/waiter" element={<Waiter />}></Route>
          <Route path="/report" element={<Report />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>

  </WebSocketProvider>



);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

