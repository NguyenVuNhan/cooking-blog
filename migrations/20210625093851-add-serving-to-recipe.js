module.exports = {
  async up(db, client) {
    await db.collection('recipes').updateMany({}, { $set: { serving: 1 } });
  },

  async down(db, client) {
    await db
      .collection('recipes')
      .updateMany({}, { $unset: { serving: null } });
  },
};
