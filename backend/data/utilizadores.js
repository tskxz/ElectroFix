import bcrypt from "bcryptjs";

const utilizadores = [
    {
        nome: 'Administrador',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        nome: 'Utilizador',
        email: 'user@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    }
]

export default utilizadores