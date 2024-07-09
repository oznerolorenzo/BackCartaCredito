import mongoose, { Schema, Document } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

interface IRicarica extends Document {
  ricaricaID: number;
  cartaCreditoID: number;
  dataRicarica: Date;
  importoRicarica: number;
}

const ricaricaSchema: Schema = new Schema({
  ricaricaID: { type: Number, unique: true },
  cartaCreditoID: { type: Number, required: true },
  dataRicarica: { type: Date, required: true },
  importoRicarica: { type: Number, required: true },
}, {
  collection: 'TRicariche'
});

ricaricaSchema.plugin(AutoIncrement, { inc_field: 'ricaricaID' });

export default mongoose.model<IRicarica>('Ricarica', ricaricaSchema);
