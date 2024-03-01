import mongoose from 'mongoose';

const ReplySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const CommentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    replies: [ReplySchema],
  },
  { timestamps: true }
);

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    text: String,
    picturePath: String,
    profileImage: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    dislikes: {
      type: Map,
      of: Boolean,
    },
    comments: [CommentSchema], // Embed CommentSchema for handling comments
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
