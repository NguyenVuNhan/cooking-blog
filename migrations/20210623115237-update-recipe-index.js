module.exports = {
  async up(db, client) {
    // Remove index
    try {
      await db
        .collection('recipes')
        .dropIndex('title_text_steps.description_text_ingredientsStr_text');
    } catch (err) {
      console.log('Index not removed');
    }

    // Create new index
    await db.collection('recipes').createIndex(
      {
        title: 'text',
        'steps.description': 'text',
        ingredientsStr: 'text',
      },
      {
        name: 'text_search',
        weights: {
          title: 10,
          'steps.description': 2,
          ingredientsStr: 5,
        },
      }
    );
  },

  async down(db, client) {
    try {
      await db.collection('recipes').dropIndex('text_search');
    } catch (err) {
      console.log('Index not removed');
    }

    // Create new index
    await db.collection('recipes').createIndex({
      title: 'text',
      'steps.description': 'text',
      ingredientsStr: 'text',
    });
  },
};
