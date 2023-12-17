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
        validateBody(req.body);
        const template = bigodon.compile(req.body.template);
        const output = await template(req.body.context, { maxExecutionMillis: EXECUTION_LIMIT });
        res.type('text/plain').send(output);
    } catch (error) {
        handleError(error, res);
    }
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));

function validateBody(body: any): void {
    if (!body.template) {
        throw new Error("The 'template' field is required");
    }

    if (typeof body.context !== 'object' || !body.context || Array.isArray(body.context)) {
        throw new Error("The 'context' field must be an object");
    }
}

function handleError(error: unknown, res: Response): void {
    if (error instanceof Error) {
        console.error(error.message);
        res.status(422).json({ error: error.message });
        return;
    }

    console.error(error);
    res.status(500).json({ error: 'An unknown error occurred' });
}
