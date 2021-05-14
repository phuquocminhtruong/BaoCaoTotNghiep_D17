import mongoose from 'mongoose';
const houseSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    message: String,
    category: String,
    imgUrl: String,
    price: {
        type: Number,
        min: 0
    },
    isBought: {
        type:Boolean,
        default: false,
    },
    houseOwner: String,
    houseSeller: String,
    area: Number,
    front: Number,
    direction: String,
    address: String,
    lat: {
        type:Number,
        default: 10.980327606201172,
        min: -90,
        max: 90
    },
    lng: {
        type:Number,
        default: 106.67426300048828,
        min: -180,
        max: 180
    }
});

var House = mongoose.model('House', houseSchema);

export default House;