import mongoose from "mongoose";

const petSchema = mongoose.Schema({
    name: String,
    breed: String,
    thumbnail: String,
    images: [{type: String}],
});

const petModel = mongoose.model("Pet",petSchema);

export default petModel;