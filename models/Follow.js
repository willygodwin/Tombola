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

followSchema.virtual("follower", {
    ref: "User",
    localField: "follower_id",
    foreignField: "_id",
    justOne: true,
});

followSchema.virtual("followee", {
    ref: "User",
    localField: "followee_id",
    foreignField: "_id",
    justOne: true,
});



const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow; 