import mongoose, { Schema, Document } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

interface ICreditCard extends Document {
  cartaCreditoID: number;
  numeroCartaCredito: string;
  titolare: string;
  scadenza: Date;
  creditoResiduo: number;
}

const creditCardSchema: Schema = new Schema({
  cartaCreditoID: {type: Number, unique: true},
  numeroCartaCredito: { type: String, required: true, unique: true },
  titolare: { type: String, required: true },
  scadenza: { type: Date, required: true },
  creditoResiduo: { type: Number, required: true },
}, {
  collection: 'CarteCredito'
});

creditCardSchema.plugin(AutoIncrement, { inc_field: 'cartaCreditoID' });

export default mongoose.model<ICreditCard>('CreditCard', creditCardSchema);
