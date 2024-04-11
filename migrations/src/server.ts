import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import apiRouter from './routes/routes';

const app: Application = express();
const port: number = 3000;

app.use(bodyParser.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my project!');
});

app.use('/api', apiRouter);

// Server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
