import express from 'express'
const router = express.Router();
import {authUtilizador, registarUtilizador, logoutUtilizador, getUtilizadorPerfil, atualizarUtilizadorPerfil, getUtilizadores, getUtilizador, atualizarUtilizador, deleteUtilizador} from '../controllers/utilizadorController.js'

router.route('/').post(registarUtilizador).get(getUtilizadores);
router.post('/logout', logoutUtilizador)
router.post('/login', authUtilizador)
router.route('/perfil').get(getUtilizadorPerfil).put(atualizarUtilizadorPerfil)
router.route('/:id').delete(deleteUtilizador).get(getUtilizador).put(atualizarUtilizador)


export default router