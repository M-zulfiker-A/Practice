import mongoose from "mongoose"

const PostSchema = mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },
    content: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
})

export const Post = mongoose.model("POSTs",PostSchema)