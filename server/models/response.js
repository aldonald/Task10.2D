const mongoose = require('mongoose')


const ResponseSchema = new mongoose.Schema(
  {
    worker:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    request:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request'
    },
    created: Date,
    type: String,
    response: String
  }
)

module.exports = mongoose.model("Response", ResponseSchema)
