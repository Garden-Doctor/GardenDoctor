// CPlantsolution.js

const Model = require("../models");

const getSolutions = async (req, res) => {
  const { result } = req.body;
  console.log("res", req.body);
  try {
    const plantSolution = await Model.Plantsolution.findOne({
      where: { dignose: result },
    });
    console.log("답: ", plantSolution.explanation);
    const { explanation, solution } = plantSolution;

    return res.status(200).json({ explanation, solution });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getSolutions };
