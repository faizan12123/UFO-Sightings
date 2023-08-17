const db = require('../models/db.js');

const queryUFOdate = async (dateOfOccurrence) => {
  try {
    let queryBuilder = db.select().table('ufo');
    
    if (dateOfOccurrence) {
      queryBuilder.whereIn('incident_date', dateOfOccurrence);
    } 

    const data = await queryBuilder;
    
    return data;
    
  } catch(error) {
    console.error('Error querying UFO data:', error);
    throw error;
  }
  }

  module.exports = queryUFOdate