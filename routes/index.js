import { Router } from 'express';
const router = Router();
import { randomProduct } from '../contenedores/prodRandom.js';


router.get('/productos-test', randomProduct);

export default router