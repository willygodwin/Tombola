const faker = require("faker");
const User = require("./../../models/User");

async function seedData() {
    // delete everything inside db
    User.collection.deleteMany();

    

    const profile_images = [
        { key: 'boy_pic_1.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/boy_pic_1.jpg' },
        { key: 'boy_pic_2.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/boy_pic_2.jpeg' },
        { key: 'boy_pic_3.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/boy_pic_2.jpg' },
        { key: 'boy_pic_4.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/boy_pic_4.jpg' },
        { key: 'boy_pic_5.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/boy_pic_5.jfif' },
        { key: 'girl_pic_1.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/girl_pic_1.jpg' },
        { key: 'girl_pic_2.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/girl_pic_2.jpg' },
        { key: 'girl_pic_3.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/girl_pic_3.jpg' },
        { key: 'girl_pic_4.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/girl_pic_4.jpg' },
        { key: 'girl_pic_5.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/girl_pic_5.jpg' },
    ]

    // for loop to generate X amount of records in my db

    for (let index = 0; index < 50; index++) {
        const randomNo1 = Math.floor(Math.random() * 10)

        const user = new User({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: "secret",
            profile_desc: 'Hello World',
            profile_image: { key: profile_images[randomNo1].key, location: profile_images[randomNo1].location }
        })

        User.create(user)
        // user.save()
    }

    console.log('usercreated');

}

module.exports = seedData;
