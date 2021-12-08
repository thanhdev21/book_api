module.exports = {
  async up(db, client) {
    const users = await db
      .collection('users')
      .find({ role: { $exists: false } })
      .toArray();
    const operations = users.map((user) => {
      return db.collection('users').updateOne(
        {},
        {
          $set: {
            role: 2,
          },
        },
      );
    });
    return Promise.all(operations);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
