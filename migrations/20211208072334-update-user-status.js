module.exports = {
  async up(db, client) {
    await db.collection('users').updateMany({}, { $set: { status: 'ACTIVE' } });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
