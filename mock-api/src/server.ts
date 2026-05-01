import express from 'express';
import { productsRouter } from './routes/products';
import { authRouter } from './routes/auth';

const app = express();
const port = 3000;

app.use(express.json());

app.get("/health", (_req, res) => {
    return res.status(200).json({ status: 'ok' });
});

app.use("/auth", authRouter);
app.use("/products", productsRouter);

app.listen(port, () => {
    console.log(`Mock Api is running on http://localhost:${port}`)
})