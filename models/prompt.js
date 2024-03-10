import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  custom_id: {
    type: String,
    required: [true, 'A custom id should be entered']
  },
  entry_price: {
    type: Number,
    default: 0,
  },
  winning_prize: {
    type: String,
    required: [true, 'Setting a prize is required.'],
  },
  draw_date: {
    type: String,
    required: [true, 'Draw date is required.'],
  },
  tickets_sold:{
    type: Number,
    default: 0,
  },
  participants:{
    type: Array,
    default: [],
  }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;