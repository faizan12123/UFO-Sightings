exports.seed = async function(knex, tableData) {

  // Deletes ALL existing entries
  await knex('ufo').del()
  for (let row of tableData) {
    await knex('ufo').insert([
      {
        city: row.city,
        state: row.state,
        country: row.country,
        shape: row.shape,
        reported_date: row.posted,
        incident_date: row.dateTime,
        duration: row.duration,
        summary: row.summary,
        images: row.images
      },
    ]);
  }
  
};
