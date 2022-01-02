const tests = require('./../helpers/connection/tests');
const Tests = tests.Tests;

module.exports = {
    register,
    getTests,
    upTest
}

async function register(colletion) {
  try {
    const test = new Tests(colletion);
    return await test.save();
  } catch (e) {
    throw e.message;
  }
}

async function getTests() {
  return await Tests.find().select('-hash');
}

async function upTest(test_id, collection) {
  const test = await Tests.findById(test_id);
  try {
    if (!test) {
      throw 'Teste não encontrado!'
    } else {
      Object.assign(test, collection);
      return await test.save();
    }
  } catch (e) {
    throw e.message
  }
}