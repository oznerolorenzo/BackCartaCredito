import { Request, Response } from 'express';
import RicaricaService from '../service/service-ricarica';

class RicaricaController {
  async createRicarica(req: Request, res: Response) {
    try {
      const { cartaCreditoID, dataRicarica, importoRicarica } = req.body;
      const newRicarica = await RicaricaService.createRicarica({ cartaCreditoID, dataRicarica, importoRicarica });
      res.status(201).json(newRicarica);
    } catch (error) {
        if (error === 'Carta di credito non trovata') {
            res.status(404).json({ message: error });
          } else if (error === 'Carta di credito scaduta') {
            res.status(400).json({ message: error });
          } else {
            res.status(500).json({ message: 'Errore del server' });
          }
        }
    }

    async getRicaricheByCartaCreditoID(req: Request, res: Response) {
        try {
          const cartaCreditoID: number = parseInt(req.query.cartaCreditoID as string);
          const maxRicariche: number = parseInt(req.query.max as string) || 10;
          const ricariche = await RicaricaService.getRicaricheByCartaCreditoID(cartaCreditoID, maxRicariche);
          res.status(200).json(ricariche);
        } catch (error) {
          if (error === 'Carta di credito non trovata') {
            res.status(404).json({ message: error });
          } else {
            res.status(500).json({ message: 'Errore del server' });
          }
        }
      }

      async getRicaricheBetweenDates(req: Request, res: Response) {
        try {
          const cartaCreditoID: number = parseInt(req.query.cartaCreditoID as string);
          const dataMin: Date = new Date(req.query.dataMin as string);
          const dataMax: Date = new Date(req.query.dataMax as string);
          const ricariche = await RicaricaService.getRicaricheBetweenDates(cartaCreditoID, dataMin, dataMax);
          res.status(200).json(ricariche);
        } catch (error) {
          if (error === 'Carta di credito non trovata') {
            res.status(404).json({ message: error });
          } else {
            res.status(500).json({ message: 'Errore del server' });
          }
        }
      }

}

export default new RicaricaController();
