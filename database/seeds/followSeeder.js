const Follow = require("./../../models/Follow");
const User = require("./../../models/User");
const getRandomModel = require('./helper/getRandomModel');

async function seedData() {


    // delete everything inside db
    Follow.collection.deleteMany();

    // for loop to generate X amount of records in my db

    console.log("creating follow");
    for (let index = 0; index < 30; index++) {
        
        const randomUser1 = await getRandomModel("User")
        const randomUser2 = await getRandomModel("User")

        const follow = new Follow({
            follower_id: randomUser1._id,
            followee_id: randomUser2._id,
        });

        follow.save();
    }
}

module.exports = seedData;
