const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: String,
  seq: Number
});
const Counter = mongoose.model('Counter', counterSchema);

const userSchema = new mongoose.Schema({
    name : String,
    email : {type : String, unique: true},
    password: String,
    collegeName: { type: String },
    accommodation: { type: Boolean, default: false },
    events: { type: [String], default: [] },
    idDocumentUrl: { type: String, default: null },
    paymentScreenshotUrl: { type: String, default: null },
    registrationNum: { type: String, unique: true },
})

userSchema.pre('save', async function(next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'user' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.registrationNum = counter.seq.toString().padStart(3, '0');
  }
  next();
});

module.exports = mongoose.model('User',userSchema);