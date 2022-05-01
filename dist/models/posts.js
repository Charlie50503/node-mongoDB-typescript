"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var postSchema = new mongoose_1.default.Schema({
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
}, {
    versionKey: false
});
var post = mongoose_1.default.model("post", postSchema);
exports.default = post;
