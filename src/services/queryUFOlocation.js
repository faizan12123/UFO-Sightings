const db = require('../models/db.js');

const queryUFOlocation = async (location) => {
  const { city, state, country } = location;
  try {
    let queryBuilder = db.select().table('ufo');

    if (city) {
      queryBuilder.whereIn('city', city);
    } 
    if (state) {
      queryBuilder.whereIn('state', state);
    } 
    if (country) {
      queryBuilder.whereIn('country', country);
    }

    const data = await queryBuilder;
    
    return data;
    
  } catch (error) {
    console.error('Error querying UFO data:', error);
    throw error;
  }
};

module.exports = queryUFOlocation;
