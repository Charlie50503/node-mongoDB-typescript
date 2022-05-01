import mongoose from "mongoose"
import { Post } from "./postDto"

const postSchema = new mongoose.Schema<Post>({
  name: {
    type: String,
    required: [true, "貼文名稱未填寫"]
  },
  tags: [
    {
      type: String,
      required: [true, "貼文 tags 未填寫"]
    }
  ],
  image: {
    type: String,
    default: ""
  },
  creatAt: {
    type: Date,
    default: Date.now,
    select: false
  },
  content: {
    type: String,
    required: [true, "Content未填寫"]
  },
  likes: {
    type: Number,
    default: 0
  }
},
  {
    versionKey: false
  })

const post = mongoose.model("post", postSchema)

export default post