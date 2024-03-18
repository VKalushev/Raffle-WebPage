import { Schema, model, models, mongoose } from 'mongoose';

  const WinningsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      winning_prize: {
        type: String,
        required: [true, 'Setting a prize is required.'],
      },
      receiptId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true
      },
      ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true
      },
      raffleId:{
        type: Schema.Types.ObjectId,
        ref: 'Raffle',
        required: true
      },
      is_claimed:{
        type: Boolean,
        default: false
      },
  });
  
  const Winnings = models.Winnings || model("Winnings", WinningsSchema);
  
  export default Winnings;