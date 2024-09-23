// Quando um cliente tenta acessar uma URL que não existe, esta função é chamada.
const notFound = (req, res, next) => {
    const error = new Error('Nao encontrado - ${req.originalUrl}');
    res.status(404)
    next(error);
}

// Trata qualquer erro que ocorra na aplicação, formatando uma resposta apropriada ao cliente, com o status de erro correto e, se em desenvolvimento, detalhes técnicos do erro.
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500: res.statusCode;
    let message = err.message;

    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        message = 'Resource not found';
        statusCode = 404;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'PRODUCTION' ? '' : err.stack
    });
}

export {notFound, errorHandler }