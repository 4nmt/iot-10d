var mongoose = require('mongoose');

// Connect MongoDB
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/iot", { useNewUrlParser: true })
const db = mongoose.connection
db.on('open', () => {
  console.log('DB connected')
})
db.on('error', (err) => console.log(err));

module.exports = db;
