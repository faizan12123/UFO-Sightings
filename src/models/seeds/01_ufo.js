exports.seed = async function(knex, tableData) {

  // Deletes ALL existing entries
  await knex('ufo').del()
  for (let i = 0; i <= tableData.length; i++) {
    await knex('ufo').insert([
      {
        LocationID: i,
        ShapeID: i,
        reported_date: tableData[i].posted,
        incident_date: tableData[i].dateTime,
        duration: tableData[i].duration,
        summary: tableData[i].summary,
        images: tableData[i].images
      },
    ]);
  }
  
};
