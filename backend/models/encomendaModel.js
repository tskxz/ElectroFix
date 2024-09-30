import mongoose from 'mongoose';

const encomendaSchema = new mongoose.Schema({
    utilizador: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Utilizador",
    },

    encomendaItens: [
        {
            nome: {type: String, required: true},
            quantidade: {type: Number, required: true},
            preco: {type: Number, required: true},
            eletrodomestico: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Eletrodomestico"
            }
        }
    ],

    enderecoPostal: {
        endereco: {type: String, required: true},
        cidade: {type: String, required: true},
        codigoPostal: {type: String, required: true},
        pais: {type: String, required: true}
    },

    metodoPagamento: {
        type: String,
        required: true
    },

    resultadoPagamento: {
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String},
    },

    precoItens: {
        type: Number,
        required: true,
        default: 0.0,
    },

    precoTaxa: {
        type: Number,
        required: true,
        default: 0.0,
    },

    precoEnvio: {
        type: Number,
        required: true,
        default: 0.0,
    },

    precoTotal: {
        type:Number,
        required: true,
        default: 0.0,
    },
    isPago: {
        type: Boolean,
        required: true,
        default: false,
    },
    pagoEm: {
        type: Date,
    },
    isEntregue: {
        type: Boolean,
        required: true,
        default: false,
    },
    entregueEm: {
        type: Date,
    },
}, {timestamps: true});

const Encomenda = mongoose.model('Encomenda', encomendaSchema);

export default Encomenda;