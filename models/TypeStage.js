const mongoose = require("mongoose")
const schema= mongoose.Schema

const TypeStage = new schema({
    type:{
        type:String
    }
})
module.exports = mongoose.model('TypeStage',TypeStage)