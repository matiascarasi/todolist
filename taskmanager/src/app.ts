import express from 'express';
import mountRoutes from './routes';
import cors from "cors"
import bodyParser from 'body-parser';

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json())  

mountRoutes(app);

const port = 3000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});