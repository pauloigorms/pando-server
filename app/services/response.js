const responses = require('./../helpers/connection/response');
const Responses = responses.Response;

module.exports = {
    register,
    mdResponse
}

async function register(response) {
  try {
    const respon = new Responses(response);
    return await respon.save();
  } catch (e) {
    throw e.message;
  }
}

async function mdResponse(rponde_id, collection) {
  const respon = new Responses(rponde_id);
  try {
    if (!respon) {
      throw 'Teste não encontrado!'
    } else {
      return await respon.updateOne({ 
        $set: collection
      }, {upsert:true})
    }
  } catch (e) {
    throw e.message
  }
}