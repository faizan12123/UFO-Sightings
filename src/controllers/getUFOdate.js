const queryUFOdate = require("../services/queryUFOdate.js")

const getUFOdate = async (req, res) => {

  let {dateOfOccurrence} = req.query
  try {
    if (dateOfOccurrence) {
      dateOfOccurrence = decodeURIComponent(dateOfOccurrence)
      dateOfOccurrence = dateOfOccurrence.split(',');
  

      for (let date of dateOfOccurrence) {
        if(!date.match(/^\d{1,2}\/\d{1,2}\/\d{2}$/)){
          return res.status(400).json({ error: "Invalid date format." });
        }
      }
    }

    const UFOdate = await queryUFOdate(dateOfOccurrence)
    if(UFOdate.length > 0) {
      return res.json(UFOdate);
    } else{
      return res.status(400).json({ error: "No results matching this search" })
    }
} catch (error) {
  console.error("Error decoding URI:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
  
module.exports = getUFOdate