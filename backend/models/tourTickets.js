const mongoose = require('mongoose');

const  TourTicketSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    tour:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'tour'
    },
    tickets:{
        type:Number,
        required:true
    },
    price:{
        type:mongoose.Types.Decimal128,
        required:true
    }
})

const tourTicket = mongoose.model('TourBookings',TourTicketSchema);

module.exports = tourTicket