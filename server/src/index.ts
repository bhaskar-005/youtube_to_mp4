import express, { Request, Response } from 'express';
import formate_router from './routes/formate';
import download_router from './routes/download';
import cors from 'cors';

const app = express();
const port = process.env.PORT ||4000

app.use(cors({
    origin:'*'
}))
app.use(express.json());

app.get('/api/v1/',(req:Request, res:Response)=>{
    res.send('server is up and running.')
})
app.use('/api/v1/',formate_router);
app.use('/api/v1/',download_router);

app.listen(port,()=>{
    console.log(`server listening on http://localhost:${port}`);
})