const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idCreator: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    createDate: {
      type: Date, 
      default: Date.now, 
      required: true
    },
    status: { 
      type: Boolean,
      required: true
    },
    alertMessage: {
      type: String,
      trim: true
    },
    descriptionMessage: {
      type: String,
      trim: true
    },
    referenceTest: {
      type: [String]
    },
    descriptionTest: {
      type: String,
      trim: true
    },
    shortName: {
      type: String,
      trim: true
    },
    aliasName: {
      type: String,
      trim: true
    },
    questions: [
      {
        descriptionQuestion: {
          type: String,
          trim: true,
          required: true
        },
        response: [
          {
            descriptionResponse: {
              type: String,
              required: true
            },
            remark: { 
              type: Number,
              required: true
            }
          }
        ]
      }
    ]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('tests', schema);
