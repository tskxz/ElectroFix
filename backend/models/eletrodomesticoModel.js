import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    utilizador: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Utilizador",
    },
    nome: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comentario: {
        type: String,
        required: true
    }
}, {timestamps: true});

const eletrodomesticoSchema = new mongoose.Schema({
    utilizador: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Utilizador",
    },

    nome: {
        type: String,
        required: true,
    },

    imagem: {
        type: String,
        required: true,
    },

    descricao: {
        type: String,
        required: true,
    },

    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    preco: {
        type: Number,
        required: true,
        default: 0
    },
    emStock: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true});

const Eletrodomestico = mongoose.model('Eletrodomestico', eletrodomesticoSchema);
export default Eletrodomestico;