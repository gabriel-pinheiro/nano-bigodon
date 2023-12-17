import express, { Request, Response } from 'express';
import Bigodon from 'bigodon';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
const PORT = Number(process.env.PORT) || 8080;
const EXECUTION_LIMIT = Number(process.env.EXECUTION_LIMIT) || 100;

const app = express();
const bigodon = new Bigodon();

app.use(morgan('dev'));
app.use(express.json());
bigodon.addHelper('log', (...args: any[]) => console.log(...args));

app.post('/execute', async (req: Request, res: Response) => {
    try {
        const { template: source, context } = req.body;

        const template = bigodon.compile(source);
        const output = await template(context, { maxExecutionMillis: EXECUTION_LIMIT });

        res.type('text/plain')
           .send(output);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(422).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
