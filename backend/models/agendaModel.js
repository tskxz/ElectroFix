import mongoose from 'mongoose';

const agendaSchema = new mongoose.Schema({
    utilizador: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Utilizador",
    },


    enderecoPostal: {
        endereco: {type: String, required: true},
        cidade: {type: String, required: true},
        codigoPostal: {type: String, required: true},
        pais: {type: String, required: true},
        dataMarcacao: {type: Date},
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

    precoDeslocamento: {
        type: Number,
        required: true,
        default: 0.0,
    },

    precoTaxa: {
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
    status:{
       type: String,
       default: "Pendente",
    }
}, {timestamps: true});

const Agenda = mongoose.model('Agenda', agendaSchema);

export default Agenda;