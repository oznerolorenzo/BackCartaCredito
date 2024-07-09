import { Router } from 'express';
import RicaricaController from '../controller/controller-ricarica';

const router: Router = Router();

router.post('/crea', RicaricaController.createRicarica);
router.get('/list', RicaricaController.getRicaricheByCartaCreditoID);
router.get('/ricerca-date', RicaricaController.getRicaricheBetweenDates);

export default router;
