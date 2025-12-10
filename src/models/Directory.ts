import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './User';
import { IFile } from './File';

export interface IDirectory extends Document {
    name: string;
    owner: IUser['_id'];
    files: IFile['_id'][];
    parent?: IDirectory['_id'];
    createdAt: Date;
    updatedAt: Date;
}

const DirectorySchema = new Schema<IDirectory>({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
    parent: { type: Schema.Types.ObjectId, ref: 'Directory', default: null },
}, { timestamps: true });

export default mongoose.model<IDirectory>('Directory', DirectorySchema);
