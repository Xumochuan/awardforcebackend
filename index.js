import express from 'express';
import cookieSessionLib from 'cookie-session';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import config from './core/config';
import mainRouter from './routes/router';
import fileUpload from 'express-fileupload';

//=========== Create server ===================
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
}));
app.use('/uploads', express.static(__dirname + '/public/uploads'));
app.use(mainRouter);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.json({error: err});
});

app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'));

export default app;


