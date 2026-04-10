import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API activa' });
});

// middleware for errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'ERROR', message: 'Internal Server Error' });
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;