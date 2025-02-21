import express from 'express';
import bfhlRoutes from './routes/RoutesIndex.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/bfhl', bfhlRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
