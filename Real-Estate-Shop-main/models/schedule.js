import mongoose from 'mongoose';
const scheduleSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    house: {
        type: Object,
        // required: true
    },
    date: {
        type: String,
       // required: true
    },
    Creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        default: 'waiting',
    },
});

var Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;