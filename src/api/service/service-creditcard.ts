import CreditCard from '../model/model-creditcard';

class CreditCardService {
  async getAllCreditCards(max: number) {
    return CreditCard.find().limit(max);
  }

  async createCreditCard(data: { numeroCartaCredito: string, titolare: string, scadenza: Date, creditoResiduo: number }) {
    const creditCard = new CreditCard(data);
    return creditCard.save();
  }

  async searchCreditCard(cognome: string) {
    // Utilizza una regex per fare una ricerca parziale case-insensitive sul cognome
    return CreditCard.find({ titolare: new RegExp(cognome, 'i') });
  }

  async checkCreditCardExpiry(id: string) {
    const creditCard = await CreditCard.findById(id);
    if (!creditCard) {
      throw new Error('Carta di credito non trovata');
    }
    const currentDate = new Date();
    return creditCard.scadenza < currentDate;
  }
}

export default new CreditCardService();
