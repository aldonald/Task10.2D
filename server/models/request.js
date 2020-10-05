const mongoose = require('mongoose')


const RequestSchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: String,
    description: String,
    choiceQuestion: String,
    choiceOptions: [String],
    decisionTaskQuestion: String,
    sentenceTaskQuestion: String,
    imageProcessingQuestion: String,
    masterWorkers: String,
    reward: String,
    workerNumbers: Number,
    name: String,
    logo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserImage'
    },
    expiry: Date,
    created: Date
  }
)

module.exports = mongoose.model("Request", RequestSchema)
