const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema(
    {
        follower_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        followee_id: { type: Schema.Types.ObjectId, ref: "User" , required: true},
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true, // to include virtual properties in json response
        },
    }
);

commentSchema.virtual("follower", {
    ref: "User",
    localField: "follower_id",
    foreignField: "_id",
    justOne: true,
});

commentSchema.virtual("followee", {
    ref: "User",
    localField: "followee_id",
    foreignField: "_id",
    justOne: true,
});



const Comment = mongoose.model("Follow", followSchema);

module.exports = Comment; 