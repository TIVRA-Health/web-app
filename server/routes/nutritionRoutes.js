const express = require("express");
const webClient = require("../client/webClient");
const config = require("../config");

const router = express.Router();

/**
 *  Look up the requested food items in NutritonX or USSD
 */
router.get("/search/:food", async (req, res) => {
  try {
    const { food } = req.params;
    console.log("Food: ", food);
    const url = config.getNutritionixSearchUrl() + food;
    console.log("Url: ", url);
    const nutritionLogDetails = await webClient.get(url);
    console.log("nutritionLogDetails: ", nutritionLogDetails);
    let counter = 1;
    const foodNames = [];
    if (nutritionLogDetails.common) {
      nutritionLogDetails.common.forEach((item) => {
        foodNames.push({
          fdcId: counter,
          description: item.food_name,
          brandName: item.brand_name ?? "",
        });
        counter++;
      });
    }

    if (nutritionLogDetails.branded) {
      nutritionLogDetails.branded.forEach((item) => {
        foodNames.push({
          fdcId: counter,
          description: item.food_name,
          brandName: item.brand_name,
        });
        counter++;
      });
    }
    const foods = {
      foods: foodNames,
    };
    const foodName = foodNames.length > 0 ? foods : nutritionLogDetails;

    console.log("NutritionX log food details: ", foodName);

    res.status(200).json(foodName);
  } catch (err) {
    console.error("Error while searching the food on nutrition log:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 *  Look up for the Nutrients of the requested food items in NutritonX or USSD
 */
router.post("/food-detail", async (req, res) => {
  try {
    const body = req.body;
    console.log("Req body: ", body);

    const nutritionLogDetails = await webClient.post(
      config.getNutritionixNutrientsUrl(),
      body
    );

    const foodNutrients = [];

    if (nutritionLogDetails.foods) {
      nutritionLogDetails.foods.forEach((food) => {
        const foodNutrient = {
          name: {
            foodName: food.food_name,
            foodNutrients: [
              {
                nutrientName: "Protein",
                value: food.nf_protein,
                unitName: "",
              },
              {
                nutrientName: "Cholesterol",
                value: food.nf_cholesterol,
                unitName: "",
              },
              {
                nutrientName: "Sodium",
                value: food.nf_sodium,
                unitName: "",
              },
              {
                nutrientName: "Fiber",
                value: food.nf_dietary_fiber,
                unitName: "",
              },
              {
                nutrientName: "Sugars",
                value: food.nf_sugars,
                unitName: "",
              },
              {
                nutrientName: "Fat",
                value: food.nf_total_fat,
                unitName: "",
              },
              {
                nutrientName: "Energy",
                value: food.nf_calories,
                unitName: "",
              },
              {
                nutrientName: "Potassium",
                value: food.nf_potassium,
                unitName: "",
              },
            ],
            description: food.food_name,
            brandName: food.brand_name,
          },
          quantity: food.serving_qty,
        };

        console.log("Food Nutrient: ", foodNutrient);
        foodNutrients.push(foodNutrient);
      });
    }

    console.log("Food Nutrients: ", foodNutrients);

    const foodNutrient =
      foodNutrients.length > 0 ? foodNutrients[0] : nutritionLogDetails;
    console.log("NutritionX log nutrients details: ", foodNutrient);

    res.json(foodNutrient);
  } catch (err) {
    console.error(
      "Error while fetching the nutrients from nutrition log:",
      err
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
