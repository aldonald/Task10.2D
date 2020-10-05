const mongoose = require('mongoose')


const ImageProcessImgSchema = new mongoose.Schema(
  {
    name: String,
    request:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request',
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

module.exports = mongoose.model("ImageProcessImg", ImageProcessImgSchema)
