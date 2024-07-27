import mongoose, { Document, Schema } from 'mongoose';

interface ISubmission extends Document {
  form: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  responses: { [key: string]: any };
  status: string;
  additionalInfoRequested: string;
}

const SubmissionSchema = new Schema<ISubmission>({
  form: { type: Schema.Types.ObjectId, ref: 'Form', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  responses: { type: Map, of: Schema.Types.Mixed, required: true },
  status: { type: String, enum: ['Pending', 'In Review', 'Completed', 'More Information Required'], default: 'Pending' },
  additionalInfoRequested: { type: String, default: '' },
}, { timestamps: true });

const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);

export default Submission;
