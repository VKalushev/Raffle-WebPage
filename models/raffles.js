import { Schema, model, models, mongoose } from 'mongoose';

const TicketSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    required: true
  },
  luckyNumber: {
    type: Number
  }
});

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
  is_sharable:{
    type: Boolean,
    default: false,
  },
  participants:{
    type: Number,
    default: 0,
  },
  archived:{
    type: Boolean,
    default: false,
  },
  winner:{
    type: String,
    default: ""
  },
  tickets: [TicketSchema]
});

const Raffle = models.Raffle || model('Raffle', RaffleSchema);

export default Raffle;
