import { Schema, model, models } from 'mongoose';

const RaffleSchema = new Schema({
  entry_price: {
    type: Number,
    default: 0,
  },
  winning_prize: {
    type: String,
    required: [true, 'Setting a prize is required.'],
  },
  draw_date: {
    type: Date,
    required: [true, 'Draw date is required.'],
  },
  tickets_sold:{
    type: Number,
    default: 0,
  },
  participants:{
    type: [String],
    default: [],
  }
});

const Raffle = models.Raffle || model('Raffle', RaffleSchema);

export default Raffle;
