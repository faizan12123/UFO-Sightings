exports.seed = async function(knex, tableData) {

  // Deletes ALL existing entries
  await knex('ufo').del()
  for (let i = 0; i <= tableData.length; i++) {
    await knex('ufo').insert([
      {
        city: tableData[i].city,
        state: tableData[i].state,
        country: tableData[i].country,
        summary: tableData[i].summary,
      },
    ]);
  }
  
};