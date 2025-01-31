const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const PoliceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  badgeNumber: { type: String, required: true, unique: true },  
  email: { type: String, required: true },        
  password: { type: String, required: true }
});

// 🔒 Hash password before saving
PoliceSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// 🔐 Compare password method
PoliceSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Police", PoliceSchema);
