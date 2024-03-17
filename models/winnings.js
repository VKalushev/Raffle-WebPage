import { Schema, model, models, mongoose } from 'mongoose';

const TicketSchema = new Schema({
    luckyNumber: {
      type: Number
    }
  });
  
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
      receipt: {
        type: String,
        required: true
      },
      tickets: [TicketSchema]
  });
  
  const Winnings = models.Winnings || model("Winnings", WinningsSchema);
  
  export default User;