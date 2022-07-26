import cors from "cors";
import express from 'express';
import { PORT } from "./utils/secrets.js";
import { initializeDB } from "./db.js";
import rootRouter from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

initializeDB();

app.use('/api',rootRouter);
app.use('/',(req,res) => res.status(404).send("Invalid path"));

const port = PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
