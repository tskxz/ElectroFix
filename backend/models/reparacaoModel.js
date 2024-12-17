import mongoose from 'mongoose';

const reparacaoSchema = new mongoose.Schema({
    agenda: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Agenda",
    },

    metodoPagamento: {
        type: String,
        required: false,
    },

    descricao: {
        type: String,
        required: true,
    },

    resultadoPagamento: {
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String},
    },

    valor_orcamento: {
        type: Number,
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

    autorizadoEm: {
        type: Date,
    },

    recusadoEm: {
        type: Date,
    },

    status:{
       type: String,
       default: "Pendente",
    }
}, {timestamps: true});

const Reparacao = mongoose.model('Reparacao', reparacaoSchema);

export default Reparacao;