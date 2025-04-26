const mongoose = require('mongoose');

// Import models
const User = require('./models/user');
const Academy = require('./models/academy');
const Group = require('./models/group');
const History = require('./models/history');
const Sport = require('./models/sport');
const Turf = require('./models/turf');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/turfit_db', {
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

async function insertMoreData() {
  try {
    // Insert More Users
    // Clear existing data
    await User.deleteMany({});
    await Academy.deleteMany({});
    await Group.deleteMany({});
    await History.deleteMany({});
    await Sport.deleteMany({});
    await Turf.deleteMany({});

    const moreUsers = await User.insertMany([
      { name: "Bob Marley", email: "bob@example.com", phone: "1112223333", favoriteSports: "Cricket" },
      { name: "Emma Watson", email: "emma@example.com", phone: "4445556666", favoriteSports: "Tennis" }
    ]);

    // Insert More Sports
    await Sport.insertMany([
      { name: " cricket", description: "Bat-and-ball game played between two teams" },
      { name: "tennis", description: "Racquet sport that can be played individually or in doubles" }
    ]);

    // Insert More Academies
    await Academy.insertMany([
      {
        name: "Pro Cricket Academy",
        location: "chennai",
        sportsOffered: ["cricket"],
        contact: "8887776665"
      },
      {
        name: "Ace Tennis Academy",
        location: "bangalore",
        sportsOffered: ["tennis"],
        contact: "9991112222"
      }
    ]);

    // Insert More Turfs
    await Turf.insertMany([
      {
        name: "Smash Ground",
        location: "hyderabad",
        sportsavailable: ["tennis", "badminton"],
        priceperhour: 1200,
        contact: "7775554443"
      },
      {
        name: "The Cricket Hub",
        location: "pune",
        sportsavailable: ["cricket"],
        priceperhour: 1000,
        contact: "8884446662"
      }
    ]);

    // Insert More Groups
    await Group.create({
      name: "Cricket Champs",
      members: [moreUsers[0]._id],
      sport: "cricket"
    });

    await Group.create({
      name: "Tennis Titans",
      members: [moreUsers[1]._id],
      sport: "tennis"
    });

    // Insert More History
    await History.insertMany([
      {
        user: moreUsers[0]._id,
        action: "Joined a cricket group",
        date: new Date()
      },
      {
        user: moreUsers[1]._id,
        action: "Booked a tennis court",
        date: new Date()
      }
    ]);
    
    // Insert Users
    const users = await User.insertMany([
      { name: "John Doe", email: "john@example.com", phone: "1234567890", favoriteSports: "Football" },
      { name: "Alice Smith", email: "alice@example.com", phone: "9876543210", favoriteSports: "Basketball" }
    ]);

    // Insert Sports
    const sports = await Sport.insertMany([
      { name: "football", description: "Team sport played with a spherical ball" },
      { name: "basketball", description: "Sport played by two teams of five players on a rectangular court" }
    ]);

    // Insert Academy
    await Academy.create({
      name: "Elite Sports Academy",
      location: "New Delhi",
      sportsOffered: ["Football", "Basketball"],
      contact: "9998887776"
    });

    // Insert Turf
    await Turf.create({
      name: "Green Turf Arena",
      location: "Mumbai",
      sportsavailable: ["Football", "Cricket"],
      priceperhour: 1500,
      contact: "7776665554"
    });

    // Insert Group
    await Group.create({
      name: "Weekend Warriors",
      members: [users[0]._id, users[1]._id],
      sport: "Football"
    });

    // Insert History
    await History.create({
      user: users[0]._id,
      action: "Booked a turf",
      date: new Date()
    });
    
    console.log("Data inserted successfully ✅");
  } catch (err) {
    console.error("Error inserting data ❌:", err);
  } finally {
    mongoose.disconnect();
  }
}

insertMoreData();
