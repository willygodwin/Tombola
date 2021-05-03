const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require('./Comment');

const postSchema = new Schema(
    {
        title: { type: String, required: true },
        total_price: {type: Number},
        price_per_ticket: {type:Number},
        no_tickets: {type: Number},
        no_tickets_remaining: {type: Number},
        description: { type: String},
        image_refs: [String],
        isClosed: {type: Boolean, default:false},
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        winner_id: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { 
        timestamps: true,
        toJSON: {
            virtuals: true, // to include virtual properties in json response
        }
     }
);

// we want to load the user resource in a virtual field
// to be populated later on
postSchema.virtual('user', {
    ref: "User",
    localField: 'user_id',
    foreignField: '_id',
    justOne: true
})


const Post = mongoose.model("Post", postSchema);



module.exports = Post;

// few relation (embbed) 

// array of Object ID (quite a bit)

// Reference ( A LOT )  -- more robust
