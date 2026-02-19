const { connect, mongoose } = require('../db');
const makeHeroStoneModel = require('./schema');

async function getAll() {
  await connect();
  const HeroStone = makeHeroStoneModel(mongoose);

  try {
    const sections = await HeroStone.find().exec();
    return { data: sections, status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}

async function getById(id) {
  await connect();
  const HeroStone = makeHeroStoneModel(mongoose);

  try {
    const section = await HeroStone.findById(id).exec();
    if (!section) return { error: 'section not found', status: 404 };
    return { data: section, status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}

async function create(data) {
  if (!data.articleName) return { error: 'articleName is required', status: 400 };
  if (!data.authorName) return { error: 'authorName is required', status: 400 };

  await connect();
  const HeroStone = makeHeroStoneModel(mongoose);

  try {
    const section = new HeroStone(data);
    await section.save();
    return { data: section, status: 201 };
  } catch (error) {
    return { error: error.message, status: 400 };
  }
}

async function update(id, data) {
  await connect();
  const HeroStone = makeHeroStoneModel(mongoose);

  try {
    const section = await HeroStone.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!section) return { error: 'section not found', status: 404 };
    return { data: section, status: 200 };
  } catch (error) {
    return { error: error.message, status: 400 };
  }
}

async function remove(id) {
  await connect();
  const HeroStone = makeHeroStoneModel(mongoose);

  try {
    const section = await HeroStone.findByIdAndDelete(id).exec();
    if (!section) return { error: 'section not found', status: 404 };
    return { data: { message: 'section deleted' }, status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}

module.exports = { getAll, getById, create, update, remove };
