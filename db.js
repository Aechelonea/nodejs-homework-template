const mongoose = require('mongoose');

async function connectDB() {
  try {
    mongoose.set('debug', true);
    await mongoose.connect('mongodb+srv://judytapatoka:DKxETqncpvHynSKT@cluster0.b4jsyey.mongodb.net/db-contacts');
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);
  }
}

module.exports = connectDB;