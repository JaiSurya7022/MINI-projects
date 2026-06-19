import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import visitorRoutes from './routes/visitorRoutes.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/visitors', visitorRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));