import Ricarica from '../model/model-ricarica';
import CreditCard from '../model/model-creditcard';

class RicaricaService {
  async createRicarica(data: { cartaCreditoID: number, dataRicarica: Date, importoRicarica: number }) {
    const cartaCredito = await CreditCard.findOne({ cartaCreditoID: data.cartaCreditoID });
    if (!cartaCredito) {
      throw new Error('Carta di credito non trovata');
    }

    const currentDate = new Date();
    if (cartaCredito.scadenza < currentDate) {
      throw new Error('Carta di credito scaduta');
    }

    const ricarica = new Ricarica(data);
    await ricarica.save();

    cartaCredito.creditoResiduo += data.importoRicarica;
    await cartaCredito.save();

    return ricarica;
  }

  async getRicaricheByCartaCreditoID(cartaCreditoID: number, max: number) {
    const cartaCredito = await CreditCard.findOne({ cartaCreditoID });
    if (!cartaCredito) {
      throw new Error('Carta di credito non trovata');
    }

    return Ricarica.find({ cartaCreditoID }).limit(max);
  }

  async getRicaricheBetweenDates(cartaCreditoID: number, dataMin: Date, dataMax: Date) {
    const cartaCredito = await CreditCard.findOne({ cartaCreditoID });
    if (!cartaCredito) {
      throw new Error('Carta di credito non trovata');
    }

    return Ricarica.find({
      cartaCreditoID,
      dataRicarica: {
        $gte: dataMin,
        $lte: dataMax
      }
    });
  }

}


export default new RicaricaService();