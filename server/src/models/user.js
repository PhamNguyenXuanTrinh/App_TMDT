const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, require: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    role: { type: String, default: "user" },
    card: { type: Array, default: [] },
    address: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
    wishList: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    isBlocked: { type: Boolean, default: false },
    refreshToken: { type: String },
    passwordChangeAt: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: String },
  },
  { timestamps: true }
);

/// mã hóa password trước khi tạo user mới
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});
/// check password có đúng không
userSchema.methods ={
  isCorrectPassword: async function(password) {
    return await bcrypt.compare(password, this.password)
  }
}
//Export the model
module.exports = mongoose.model("User", userSchema);
