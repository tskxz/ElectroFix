import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store.js';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import EletrodomesticoScreen from './Screens/EletrodomesticoScreen/EletrodomesticoScreen';
import CarrinhoScreen from './Screens/CarrinhoScreen/CarrinhoScreen'
import LoginScreen from './Screens/LoginScreen/LoginScreen.jsx';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen.jsx';
import ShippingScreen from './Screens/ShippingScreen/ShippingScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PagamentoScreen from './Screens/PagamentoScreen/PagamentoScreen.jsx';
import EncomendarScreen from './Screens/EncomendarScreen/EncomendarScreen.jsx';
import EncomendaScreen from './Screens/EncomendaScreen/EncomendaScreen.jsx';
import AgendaScreen from './Screens/AgendaScreen/AgendaScreen.jsx';
import ReparacaoScreen from './Screens/ReparacaoScreen/ReparacaoScreen.jsx';
import PerfilScreen from './Screens/PerfilScreen/PerfilScreen.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import ListaEncomendaScreen from './Screens/admin/ListaEncomendaScreen.jsx';
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import ListaEletrodomesticoScreen from './Screens/admin/ListaEletrodomesticoScreen.jsx';
import AtualizarEletrodomesticoScreen from './Screens/admin/AtualizarEletrodomesticoScreen.jsx';
import ListaUtilizadorScreen from './Screens/admin/ListaUtilizadorScreen.jsx';
import AtualizarUtilizadorScreen from './Screens/admin/AtualizarUtilizadorScreen.jsx';
import ServicoMarcacaoScreen from './Screens/ServicoMarcacaoScreen/ServicoMarcacaoScreen.jsx';
import AgendarServicoScreen from './Screens/AgendarServicoScreen/AgendarServicoScreen.jsx';
import PagamentoServicoScreen from './Screens/PagamentoServicoScreen/PagamentoServicoScreen.jsx';
import ListaAgendaScreen from './Screens/admin/ListaAgendaScreen.jsx';
import AtualizarAgendaScreen from './Screens/admin/AtualizarAgendaScreen.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen/>} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen/>} />
      <Route path="/search/:keyword" element={<HomeScreen/>} />
      <Route path="/eletrodomestico/:id" element={<EletrodomesticoScreen />} />
      <Route path="/carrinho" element={<CarrinhoScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute/>}>
        <Route path="/compra" element={<ShippingScreen/>}/> 
        <Route path="/pagamento" element={<PagamentoScreen/>}/>
        <Route path="/encomendar" element={<EncomendarScreen/>}/>
        <Route path="/encomenda/:id" element={<EncomendaScreen/>} />
        <Route path="/agenda/:id" element={<AgendaScreen/>} />
        <Route path="/reparacao/:id" element={<ReparacaoScreen/>} />
        <Route path="/perfil" element={<PerfilScreen/>} />
        <Route path="/marcacao" element={<ServicoMarcacaoScreen/>} />
        <Route path="/agendar" element={<AgendarServicoScreen/>} />
        <Route path="/pagamentoservico" element={<PagamentoServicoScreen/>} />
      </Route>
      <Route path="" element={<AdminRoute/>}>
        <Route path="/admin/listaencomenda" element={<ListaEncomendaScreen/>} /> 
        <Route path="/admin/listaeletrodomestico" element={<ListaEletrodomesticoScreen/>} />
        <Route path="/admin/listaeletrodomestico/:pageNumber" element={<ListaEletrodomesticoScreen/>} />
        <Route path="/admin/eletrodomestico/:id/edit" element={<AtualizarEletrodomesticoScreen/>} />
        <Route path="/admin/agenda/:id/edit" element={<AtualizarAgendaScreen/>} />
        <Route path="/admin/listautilizador" element={<ListaUtilizadorScreen/>} /> 
        <Route path="/admin/utilizador/:id/edit" element={<AtualizarUtilizadorScreen/>} /> 
        <Route path='/admin/listaagendas' element={<ListaAgendaScreen/>} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router}/>
      </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
