/** Update recipes document
 * Remove:
 *    - course
 * Added
 *    - ingredients.ingredient_name
 *    - ingredients.quantity
 *    - ingredients.unit
 */
var ObjectId = require('mongodb').ObjectId;
var axios = require('axios');

async function getParsedIngredients(key, raw_data) {
  const url = `https://api.spoonacular.com/recipes/parseIngredients?apiKey=${key}`;
  const params = new URLSearchParams();
  params.append('ingredientList', raw_data);
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  return (await axios.post(url, params, config)).data[0];
}

module.exports = {
  async up(db, client) {
    return;
    // course
    await db.collection('recipes').updateOne({}, { $unset: { course: null } });
    // const recipe = await collection.find({ title: 'Ceasar salad' });
    const recipes = db.collection('recipes').find({});

    while (await recipes.hasNext()) {
      const recipe = await recipes.next();

      const ingredients = [];

      for (const doc of recipe.ingredients) {
        const ingredient = await db
          .collection('ingredients')
          .findOne({ _id: ObjectId(doc.ingredient) });

        const raw_data = doc.quantity + ' of ' + ingredient.name;

        let data;
        try {
          data = await getParsedIngredients(process.env.SPOONACULAR_API_KEY_1);
        } catch {
          try {
            data = await getParsedIngredients(
              process.env.SPOONACULAR_API_KEY_2
            );
          } catch {
            data = await getParsedIngredients(
              process.env.SPOONACULAR_API_KEY_3
            );
          }
        }

        await db.collection('ingredients').updateOne(
          { _id: ObjectId(doc.ingredient) },
          {
            $set: {
              name: ingredient.name,
              image: data.image,
              possibleUnits: data.possibleUnits,
              aisle: data.aisle,
            },
          }
        );
        ingredients.push({
          ingredient: ObjectId(doc.ingredient),
          ingredient_name: ingredient.name,
          quantity: data.amount,
          unit: data.unit,
          raw_data,
        });
      }

      await db
        .collection('recipes')
        .updateOne({ _id: ObjectId(recipe._id) }, { $set: { ingredients } });
    }
  },

  down(db, client) {
    const collection = db.collection('recipes');
    // course
    // await collection.updateOne({}, {$set: {course: null}});
  },
};
