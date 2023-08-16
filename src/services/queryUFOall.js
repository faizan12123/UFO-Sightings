const db = require('../models/db.js');

const queryUFOall = async () => {
  try {
    const data = await db.select().table('ufo');
    return data;
  } catch (error) {
    console.error('Error querying UFO data:', error);
    throw error;
  }
};

module.exports = queryUFOall;
