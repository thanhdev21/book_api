import mongoose from 'mongoose';

export interface ClientSchema {
  clientId: string | null;
  secretKey: string | null;
  deletedAt: Date | null;
}

const ClientSchema = new mongoose.Schema<ClientSchema>(
  {
    clientId: { type: String, required: false },
    secretKey: { type: String, required: false },
    deletedAt: { type: Date, required: false },
  },
  { timestamps: true },
);
const ClientModel = mongoose.models.User || mongoose.model('client', ClientSchema);

export default ClientModel;
