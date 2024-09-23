import mongoose from 'mongoose';

const utilizadorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {timestamps: true});

const Utilizador = mongoose.model('Utilizador', utilizadorSchema);
export default Utilizador;