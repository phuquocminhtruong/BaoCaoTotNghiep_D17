import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'express';
import userRoutes from './routes/users.js';
import NewsRoutes from './routes/news.js';
import houseRoutes from './routes/houses.js';
import scheduleRoutes from './routes/schedules.js';
import categoryRoutes from './routes/categories.js';

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;

dotenv.config();


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));


app.use('/users', userRoutes);
app.use('/news', NewsRoutes);
app.use('/houses', houseRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/categories', categoryRoutes);

const dbUri = process.env.MONGODB_URI;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} cannot connect`));

mongoose.set('useFindAndModify', false);