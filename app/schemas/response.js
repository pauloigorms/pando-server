const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    idTest: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    createDate: {
      type: Date, 
      default: Date.now, 
      required: true
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    remarkResponse: { 
      type: Number
    },
    normResponse: { 
      type: Number
    },
    percentilResponse: { 
      type: Number
    },
    amountResponse: { 
      type: Number
    },
    questions: [
      {
        idQuestion: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true
        },
        response: [Boolean]
      }
    ]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('response', schema);