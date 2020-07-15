const mongoose = require("mongoose")
const schema = mongoose.Schema

const SpecialiteSchema = new schema(
    {
        specialite:String,
        diplome:String
    }
)
module.exports = Specialite = mongoose.model('Specialite',SpecialiteSchema)