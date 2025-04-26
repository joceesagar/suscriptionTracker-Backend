//Here we are intercepting the error and trying to know more about these errors or trying to classify errors
//(req,res,next) ----> Normal middleware
//(err,req,res,next) ----> Error middleware (express only jumps here if any error, exception occurs not like normal middleware)
const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err }

        error.message = err.message;
        console.log(err)

        //Mongoose bad ObjectId
        if (err.name === 'CastError') {
            const message = 'Resource not found'

            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key
        if (err.code === 11000) {
            const message = 'Duplicate field value entered'

            error = new Error(message);
            error.statusCode = 400;
        }

        //Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);

            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        return res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error' });

    } catch (error) {
        next(error)
    }
}

export default errorMiddleware;