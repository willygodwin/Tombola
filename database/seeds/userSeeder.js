const faker = require("faker");
const User = require("./../../models/User");

async function seedData() {
    // delete everything inside db
    User.collection.deleteMany();

    const randomNo1 = Math.floor(Math.random() * 3)
    const profile_images = [
        { key: '1620448548663-jiffy-3.png', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/1620448548663-jiffy-3.png' },
        { key: '1620448548663-jiffy-3.png', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/1620448548663-jiffy-3.png' },
        { key: '1620448548663-jiffy-3.png', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/1620448548663-jiffy-3.png' }
    ]

    // for loop to generate X amount of records in my db

    for (let index = 0; index < 50; index++) {

        const user = new User({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: "secret",
            profile_desc: 'Hello World',
            profile_image: profile_images[randomNo1]
        })

        User.create(user)
        // user.save()
    }

    console.log('usercreated');

}

module.exports = seedData;
