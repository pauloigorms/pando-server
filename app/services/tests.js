const tests = require('./../helpers/connection/tests');
const Tests = tests.Tests;

const responses = require('./../helpers/connection/response');
const Responses = responses.Response;

const today = new Date()

module.exports = {
    register,
    getTests,
    upTest,
    mdTest,
    getNumUnresponseDay,
    getNumTestEgde,
    getData4Chart
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

async function mdTest(test_id, collection) {
  const test = await Tests.findById(test_id);
  try {
    if (!test) {
      throw 'Teste não encontrado!'
    } else {
      return await test.updateOne({ 
        $set: collection
      }, {upsert:true})
    }
  } catch (e) {
    throw e.message
  }
}

async function getNumUnresponseDay(user_id) {
  let total = await Responses.find(
    { 
      idUser: user_id,
      createDate: {
        $gte: today,
        $lt: today
      }
    })
  return {
    totalTestToday: total.length
  }
}

async function getNumTestEgde(user_id) {
  let tests = await Tests.find().select('-hash');
  let arr_results = []

  if (tests)
    for (const item of tests)
      arr_results.push({
        "idTest": item._id,
        // "countTotalTest": await Responses.countDocuments({
        //   idUser: user_id,
        //   idTest: item._id
        // }),
        "countTotalYear": await Responses.countDocuments({
          idUser: user_id,
          idTest: item._id,
          createDate: {
            $gte: today.getFullYear()
          }
        })
      })
    return arr_results
}

async function getData4Chart(user_id, paramns) {

  try {

    let hoje = new Date()
    let responses = await Responses.find(
      { 
        idUser: user_id,
        createDate: {
          $gte: paramns.startDate != '' ? paramns.startDate : new Date(hoje.setDate(hoje.getDate() - 90)),
          $lt: paramns.endDate != '' ? paramns.endDate : today
        }
      })

    return responses.reduce((groups, item) => {
      let group = (groups[item.createDate] || []);
      group.push(item);
      groups[item.createDate.toLocaleString("pt-Br")] = {
        remarkResponse: group[0].remarkResponse,
        normResponse: group[0].normResponse,
        percentilResponse: group[0].percentilResponse,
        levelResponse: group[0].levelResponse,
        idTest: group[0].idTest
      };
      return groups;
    }, {});

  } catch (error) {
    return error
  }

}