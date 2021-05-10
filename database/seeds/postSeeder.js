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
        const numberTicks = 100
        const postInfo = [

            {
                name: 'Jimihendricks Stratocaster Voodoo Child Guitar',
                price: 3200,
                images: [{ key: 'jimiguitar.png', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/jimiguitar.png' }, { key: 'jimiguitar(1).png', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/jimiguitar%281%29.jpg' }, { key: 'jimiguitar(2).png', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/jimiguitar%282%29.jpg' }, { key: 'jimiguitar(3).png', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/jimiguitar%283%29.jpg' },],
                description: 'Our popular Deep “C” neck now sports smooth rolled fingerboard edges, a “Super-Natural” satin finish and a newly sculpted neck heel for a supremely comfortable feel and easy access to the upper register. New V-Mod II Stratocaster single-coil pickups are more articulate than ever while retaining bell-like chime and warmth, while the Double Tap™ bridge pickup delivers punchy humbucking tones as well as calibrated single-coil sounds at the push of a button. An upgraded 2-point tremolo with a cold-rolled steel block increases sustain, clarity and high-end sparkle.'
            },
            {
                name: 'iPad',
                price: 500, 
                images: [{ key: 'ipad.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/ipad.jpg' }, { key: 'ipad(1).jfif', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/ipad%281%29.jfif' }],
                description: '128 GB iPad unused and still in the box'
            },
            {
                name: "YEEZY BOOST 700 'WAVE RUNNER' SNEAKERS",
                price: 800,
                images: [{ key: 'yeezy.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/yeezy.jpg' }, { key: 'yeezy(1).jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/yeezy%281%29.jpg' }, { key: 'yeezy(2).jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/yeezy%282%29.jpg' }, { key: 'yeezy(3).jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/yeezy%283%29.jpg' }, { key: 'yeezy(4).jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/yeezy%284%29.jpg' }], 
                description: 'This first colorway of Yeezy Wave Runner 700 from Kanye West was introduced in November 2017, following an initial public opening in the Yeezy Season 5 fashion show previously that year. The retro-inspired lines of the sneaker worked together with a chunky silhouette reminiscent of a previous age. A mesh base on the quarter panel is completed in gray and a yellow with a teal forefoot. '
            },
            {
                name: 'Diamond Earrings',
                price: 400,
                images: [{ key: 'diamond.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/diamond.jpg' }],
                description: '9ct Gold Diamond Miracle Set Huggie Earrings. External Size= 12mm x 3mm.'
            },
            {
                name: 'Tennis Bracelet',
                price: 1000,
                images: [{ key: '/bracelets.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/bracelets.jpg' }],
                description: 'Swarovski Tennis Deluxe Bracelet White, Rose-gold tone plated'
            },
            {
                name: '128GB iPhone 12',
                price: 1400,
                images: [{ key: 'iPhone12.jfif', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/iPhone12.jfif' }, { key: 'iPhone12(1).jfif', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/iPhone12%281%29.jfif' }],
                description: 'Latest iPhone 12, 128GB, colour: purple has not been used and still in its case.'
            },
            {
                name: 'Yamaha WR450F',
                price: 5000,
                images: [{ key: 'yamahaWR450F.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/yamahaWR450F.jpg' }, { key: 'yamahaWR450F(1).jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/yamahaWR450F%281%29.jpg' }], 
                description: '2015 Yamaha WR450F great bike has had a gear box rebuild, Engine been freshened up all new gaskets etc,  Full fmf pipe, All receipts, about 2 hours run time, starts easy as '
            },
            {
                name: 'Joy Baccarat Pure Parfum, Limited Edition',
                price: 1800,
                images: [{ key: 'joyPerfume(1).jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/joyPerfume%281%29.jpg' }, { key: 'joyPerfume.jpg', location: 'https://tombolaproject3.sfo3.digitaloceanspaces.com/joyPerfume.jpg' }], 
                description: "Jean Patou’s Joy, created in 1930, has always been notoriously pricey. It was, for most of the 20th century, considered the costliest perfume you could buy due to the sheer extravagance of its floral content—an astonishing 10,600 jasmine flowers and 28 dozens or roses per bottle. This limited-edition marvel ups the ante even more with a keepsake Baccarat bottle—an expression of Joy that isn't fleeting."
            },

        ]
        

        const randomNo1 = Math.floor(Math.random() * 8)
        const randomNo2 = Math.floor(Math.random() * 8)

        const post = new Post({
            title: postInfo[randomNo1].name,
            body: faker.lorem.paragraph(),
            user_id: randomUser._id,
            description: postInfo[randomNo1].description,
            price_per_ticket: postInfo[randomNo1].price/100,
            no_tickets: numberTicks,
            no_tickets_remaining: numberTicks,
            total_price: postInfo[randomNo1].price,
            image_refs: postInfo[randomNo1].images,
            winner_id: null,
            isClosed: false

        });

        post.save();
    }
}

module.exports = seedData;
