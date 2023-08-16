exports.seed = async function(knex, tableData) {

  // Deletes ALL existing entries
  await knex('ufo').del()
  for (let i = 0; i <= tableData.length; i++) {
    await knex('ufo').insert([
      {
        name: tableData[i].shape,
      },
    ]);
  }
  
};