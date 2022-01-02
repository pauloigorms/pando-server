const responses = require('./../helpers/connection/response');
const Responses = responses.Response;

module.exports = {
    register
}

async function register(response) {
  try {
    const respon = new Responses(response);
    return await respon.save();
  } catch (e) {
    throw e.message;
  }
}