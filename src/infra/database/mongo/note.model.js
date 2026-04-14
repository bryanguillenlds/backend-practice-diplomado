import { Schema, model } from 'mongoose';

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  isPrivate: { type: Boolean, required: true },
  password: { type: String, required: true },
  userId: { type: String, required: true },
}, { timestamps: true });

const NoteModel = model('Note', noteSchema);

export default NoteModel;