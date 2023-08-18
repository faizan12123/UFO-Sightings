const db = require('../models/db.js');

const queryUFO = async (location, dateOfOccurrence) => {
  const { city, state, country } = location;
  try {
    let queryBuilder = db.select().table('ufo');
    
    if (dateOfOccurrence) {
      queryBuilder.whereIn('incident_date', dateOfOccurrence);
    } 
    if (city) {
      queryBuilder.whereIn(db.raw('LOWER(city)'), city);
    } 
    if (state) {
      queryBuilder.whereIn(db.raw('LOWER(state)'), state);
    } 
    if (country) {
      queryBuilder.whereIn(db.raw('LOWER(country)'), country);
    }

    const data = await queryBuilder;
    
    return data;
    
  } catch (error) {
    console.error('Error querying UFO data:', error);
    throw error;
  }
};

module.exports = queryUFO;