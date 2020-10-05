const mongoose = require('mongoose')


const UserImageSchema = new mongoose.Schema(
  {
    name: String,
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: false
    },
    img:
    {
      data: Buffer,
      contentType: String
    },
    created: Date
  }
)

module.exports = mongoose.model("UserImage", UserImageSchema)
