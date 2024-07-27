import { Schema, model, Document } from 'mongoose';

export interface IChat extends Document {
  sender: string;
  text: string;
  avatar: string;
  timestamp?: Date;
  topic: string;
  conversationId: string;
  userId: string;
}

const chatSchema = new Schema<IChat>({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  avatar: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  topic: { type: String, required: true },
  conversationId: { type: String, required: true },
  userId: { type: String, required: true }
});

export const Chat = model<IChat>('Chat', chatSchema);
