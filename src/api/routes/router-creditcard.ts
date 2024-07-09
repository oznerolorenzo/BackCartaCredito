import { Router } from 'express';
import CreditCardController from '../controller/controller-creditcard';

const router: Router = Router();

router.get('/lista', CreditCardController.getAllCreditCards);
router.post('/creare', CreditCardController.createCreditCard);
router.get('/cercare', CreditCardController.searchCreditCard);
router.get('/scaduta/:id', CreditCardController.checkCreditCardExpiry);

export default router;
