import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  // ...add password hash and other fields as needed...
});

const User = mongoose.model('User', userSchema);
export default User;
