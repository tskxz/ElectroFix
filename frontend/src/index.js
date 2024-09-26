import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store.js';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

import App from './App';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import EletrodomesticoScreen from './Screens/EletrodomesticoScreen/EletrodomesticoScreen';
import CarrinhoScreen from './Screens/CarrinhoScreen/CarrinhoScreen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/eletrodomestico/:id" element={<EletrodomesticoScreen />} />
      <Route path="/carrinho" element={<CarrinhoScreen />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
