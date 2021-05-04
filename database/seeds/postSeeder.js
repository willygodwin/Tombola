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
        const postInfo = [
            {name: 'Dirtbike',
             images: ["/images/dirtbike.jpg", "/images/dirtbike.jpg", "/images/dirtbike.jpg", "/images/dirtbike.jpg"]}, 
            {name: 'Jimihendricks Stratocaster Voodoo Child Guitar',
            images: ['/images/jimiguitar.png']}, 
            {name: 'iPad',
            images: ['/images/ipad.jpg', '/images/ipad.jpg',]}, 
            {name: 'Yeezy Sneakers',
            images: ['/images/yeezy.jpg', '/images/yeezy.jpg',]}, 
            {name: 'Diamond Necklace',
            images: ['/images/diamond.jpg', '/images/diamond.jpg']}, 
            {name: 'Bracelet',
            images: ['/images/bracelets.jpg', '/images/bracelets.jpg']}, 
            {name: 'iPhone',
            images: ['/images/iphone.jpg','/images/iphone.jpg']}, 
            {name: 'Yamaha WR450F',
            images: ['/images/yamahaWR450F.jpg','/images/yamahaWR450F(1).jpg']}, 

        ]
        
        
        const randomNo1 = Math.floor(Math.random() * 8)
        const randomNo2 = Math.floor(Math.random() * 8)

        const post = new Post({
            title: postInfo[randomNo1].name,
            body: faker.lorem.paragraph(),
            user_id: randomUser._id,
            description: faker.lorem.paragraph(), 
            price_per_ticket: pricePerTick,
            no_tickets: numberTicks,
            no_tickets_remaining: numberTicks,
            total_price: roundedPrice, 
            image_refs: [postInfo[randomNo1].images[0], postInfo[randomNo1].images[1], postInfo[randomNo1].images[3]],
            winner_id: null, 
            isClosed: false

        });

        post.save();
    }
}

module.exports = seedData;
