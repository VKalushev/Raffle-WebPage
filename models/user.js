import { Schema, model, models, mongoose } from 'mongoose';

const TicketSchema = new Schema({
  luckyNumber: {
    type: Number
  }
});

const ReceiptSchema = new Schema({
    raffleId: {
      type: Schema.Types.ObjectId,
      ref: 'Raffle',
      required: true
    },
    winning_prize: {
      type: String,
      required: [true, 'Setting a prize is required.'],
    },
    draw_date: {
      type: Date,
      required: [true, 'Draw date is required.'],
    },
    is_claimed:{
      type: Boolean,
      default: false,
    },
    tickets: [TicketSchema]
  });

const UserSchema = new Schema({
  email: {
    type: String,
    default: "", // Set default value to an empty string
    unique: false, // Allow multiple documents with an empty string
  },
  username: {
    type: String,
    default: "guest",
    match: [/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  password: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: '/assets/default_profile/male.png'
  },
  role: {
    type: String,
    default: 'Normal'
  },
  winning_receipts: [ReceiptSchema],
  receipts: [ReceiptSchema]
});

const User = models.User || model("User", UserSchema);

export default User;