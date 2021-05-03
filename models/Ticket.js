const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
    {
        no_tickets_bought: { type: Number, required: true  },
        lower_limit: { type: Number, required: true },
        upper_limit: { type: Number, required: true },
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        post_id: { type: Schema.Types.ObjectId, ref: "Post" , required: true},
        isNotified: {type: Boolean, default:false},
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true, // to include virtual properties in json response
        },
    }
);

ticketSchema.virtual("user", {
    ref: "User",
    localField: "user_id",
    foreignField: "_id",
    justOne: true,
});

ticketSchema.virtual("post", {
    ref: "Post",
    localField: "post_id",
    foreignField: "_id",
    justOne: true,
});


const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket; 