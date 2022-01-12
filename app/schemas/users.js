const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    lastName: { 
      type: String,
      trim: true
    },
    email: {
      type: String, 
      unique: true,
      required: true
    },
    username: {
      type: String, 
      unique: true, 
      required: true
    },
    password: {
      type: String, 
      required: true
    },
    status: {
      type: Boolean, //0-inactive 1-active
      required: true
    },
    profileImagePath: {
      type: String
    },
    createDate: {
      type: Date, 
      default: Date.now,
      unique: true,
      required: true
    },
    profile: {
      type: String, 
      required: true
    },
    acceptTerms: {
      type: String, 
      required: true
    },
    gender: {
      type: String, 
      required: true
    },
    maritalStatus: {
      type: String, 
      required: true
    },
    birthDate: {
      type: Date
    },
    occupation: {
      type: String,
    },
    company: {
      type: String,
    },
    sector: {
      type: String,
    },
    phone: {
      type: String
    }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('users', schema);
