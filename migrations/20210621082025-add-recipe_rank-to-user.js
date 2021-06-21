// Add recipe_rank field to user document

module.exports = {
  async up(db, client) {
    await db
      .collection('users')
      .updateMany({}, { $set: { recipe_rank: null } });
  },

  async down(db, client) {
    await db
      .collection('users')
      .updateMany({}, { $unset: { recipe_rank: null } });
  },
};
