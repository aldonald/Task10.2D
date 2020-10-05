const mongoose = require('mongoose')


const WorkerSchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    },
    worktypes: [String],
    availabilities: [Date],
    areas: [String]
  }
)

module.exports = mongoose.model("Worker", WorkerSchema)
