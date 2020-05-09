import 'module-alias/register';
import express, { Express } from 'express';
import { Routes } from '@core/index';

const PORT = 3333;
const app:Express = express();

app.use(express.json());
app.use('/', Routes);
app.listen(PORT);
