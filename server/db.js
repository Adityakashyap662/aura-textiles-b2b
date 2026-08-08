const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/luxaen';
    console.log(`Connecting to MongoDB at: ${connStr}`);
    
    // Timeout in 3 seconds to avoid hanging if MongoDB is not installed/running
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000
    });
    
    global.dbType = 'mongodb';
    console.log('MongoDB database connected successfully.');
  } catch (error) {
    global.dbType = 'memory';
    console.log('\n[WARNING] MongoDB connection failed or refused.');
    console.log('Running Express server in resilient In-Memory Fallback mode.');
    console.log('Any additions/edits made will be saved in-memory for this session.\n');
  }
};

module.exports = connectDB;
