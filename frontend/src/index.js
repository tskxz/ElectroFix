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
import LoginScreen from './Screens/LoginScreen/LoginScreen.jsx';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen.jsx';
import ShippingScreen from './Screens/ShippingScreen/ShippingScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PagamentoScreen from './Screens/PagamentoScreen/PagamentoScreen.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/eletrodomestico/:id" element={<EletrodomesticoScreen />} />
      <Route path="/carrinho" element={<CarrinhoScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute/>}>
        <Route path="/compra" element={<ShippingScreen/>}/> 
        <Route path="/pagamento" element={<PagamentoScreen/>}/>
      </Route>
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
