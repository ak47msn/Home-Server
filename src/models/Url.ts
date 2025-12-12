import { Schema, model } from "mongoose";

export interface IURL extends Document {
    original: string,
    shorted: string,
    owner: string
}

const UrlSchema = new Schema({
    original: {
        type: String,
        required: true
    },
    shorted: {
        type: String,
        unique: true,
    },
    owner: {
        type: String,
        required: true
    }
});

export default model<IURL>("ShortUrl", UrlSchema);