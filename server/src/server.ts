import express from 'express';
import cors from "cors";
import cron from "node-cron";

import CronJob from "./CronJob";
import routes from './routes';

const cronJob = new CronJob();

cron.schedule("0 0 6 * * *", () => cronJob.verifyEvents());

const app = express();

app.use(cors());
app.use(express.json());


app.use(routes);

app.listen(3333);