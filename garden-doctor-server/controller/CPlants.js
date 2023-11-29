// CPlantsolution.js

const { MyPlants, PlantType } = require("../models");
const myPlants = async (req, res) => {
  try {
    const { user_id } = req.body;
    const loadMyPlants = await MyPlants.findAll({
      include: [PlantType],
      where: { user_id: user_id },
    });
    res.status(200).send(loadMyPlants);
  } catch (error) {
    console.log(error);
  }
};
const addPlant = async (req, res) => {
  try {
    const { user_id, plant_nickname, plant_img, plant_type, plant_date } =
      req.body;

    const myPlant = await MyPlants.create({
      user_id,
      plant_nickname,
      plant_img,
      plant_date,
    });
    const plant = plant_type;
    console.log("plant_type", plant_type);
    console.log("plant", plant);
    const plantType = await PlantType.findAll({
      where: { plant_type: plant },
    });
    await myPlant.addPlantTypes(plantType);
    res.status(200).send(myPlant);
  } catch (error) {
    console.log(error);
  }
};
const plantDetail = async (req, res) => {
  try {
    const { user_id, myPlant_id } = req.body;
    const loadPlantDetail = await MyPlants.findOne({
      include: [PlantType],
      where: { user_id: user_id, myPlant_id: myPlant_id },
    });
    res.status(200).send(loadPlantDetail);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addPlant, myPlants, plantDetail };
