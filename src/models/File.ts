import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IDirectory } from './Directory';

export interface IFile extends Document {
    name: string;
    path: string;
    size: number;
    mimeType: string;
    checksum: string;
    extension: string;
    owner: IUser['_id'];
    directory: IDirectory['_id'];
    tags?: string[];
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const FileSchema = new Schema<IFile>({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    checksum: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    directory: {
        type: Schema.Types.ObjectId,
        ref: 'Directory', required: true
    },
    tags: [{ type: String }],
    description: { type: String },
}, { timestamps: true });

export default mongoose.model<IFile>('File', FileSchema);
