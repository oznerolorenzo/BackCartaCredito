import { Request, Response } from 'express';
import CreditCardService from '../service/service-creditcard';

class CreditCardController {
  async getAllCreditCards(req: Request, res: Response) {
    try {
      const maxCards: number = parseInt(req.query.max as string) || 10;
      const creditCards = await CreditCardService.getAllCreditCards(maxCards);
      res.status(200).json(creditCards);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async createCreditCard(req: Request, res: Response) {
    try {
      const { numeroCartaCredito, titolare, scadenza, creditoResiduo } = req.body;
      const newCreditCard = await CreditCardService.createCreditCard({ numeroCartaCredito, titolare, scadenza, creditoResiduo });
      res.status(201).json(newCreditCard);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async searchCreditCard(req: Request, res: Response) {
    try {
      const cognome: string = req.query.cognome as string;
      const creditCards = await CreditCardService.searchCreditCard(cognome);
      res.status(200).json(creditCards);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async checkCreditCardExpiry(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const isExpired = await CreditCardService.checkCreditCardExpiry(id);
      res.status(200).json({ isExpired });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default new CreditCardController();
