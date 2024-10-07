import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

utilizadorSchema.methods.matchPassword  = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
utilizadorSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})
const Utilizador = mongoose.model('Utilizador', utilizadorSchema);
export default Utilizador;