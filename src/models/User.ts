import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    profileImage?: string;
    bio?: string;
    lastLogin?: Date;
    permissions?: string[];
    settings?: {
        emailNotifications: boolean;
        publicProfile: boolean;
    };
    baseDir: string;
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String
    },
    bio: {
        type: String
    },
    lastLogin: {
        type: Date
    },
    permissions: [{
        type: String
    }],
    settings: {
        emailNotifications: {
            type: Boolean,
            default: true
        },
        publicProfile: {
            type: Boolean,
            default: false
        }
    },
    baseDir: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default model<IUser>("User", UserSchema);
