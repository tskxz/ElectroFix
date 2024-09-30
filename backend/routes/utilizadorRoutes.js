import express from 'express'
const router = express.Router();
import {authUtilizador, registarUtilizador, logoutUtilizador, getUtilizadorPerfil, atualizarUtilizadorPerfil, getUtilizadores, getUtilizador, atualizarUtilizador, deleteUtilizador} from '../controllers/utilizadorController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').post(registarUtilizador).get(protect, admin, getUtilizadores);
router.post('/logout', logoutUtilizador)
router.post('/login', authUtilizador)
router.route('/perfil').get(protect, getUtilizadorPerfil).put(protect, atualizarUtilizadorPerfil)
router.route('/:id').delete(protect, admin, deleteUtilizador).get(protect, admin, getUtilizador).put(protect, admin, atualizarUtilizador)


export default router