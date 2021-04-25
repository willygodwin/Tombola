const faker = require("faker");
const Post = require("./../../models/Post");
const User = require("./../../models/User");
const getRandomModel = require("./helper/getRandomModel");

async function seedData() {
    // delete everything inside db
    Post.collection.deleteMany();

    // for loop to generate X amount of records in my db

    console.log('creating post');
    for (let index = 0; index < 50; index++) {

        const randomUser = await getRandomModel("User");
        const randomPrice = Math.random() * 1000
        const roundedPrice = Math.round(randomPrice / 100) * 100
        const numberTicks = 100
        const pricePerTick = roundedPrice/100
        const images = ["/hello", 'Moto', 'GP']


        const post = new Post({
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            user_id: randomUser._id,
            description: faker.lorem.paragraph(), 
            price_per_ticket: pricePerTick,
            no_tickets: numberTicks,
            total_price: roundedPrice, 
            image_refs: images

        });

        post.save();
    }
}

module.exports = seedData;
