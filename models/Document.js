const mongoose= require("mongoose")
const schema = mongoose.Schema

const DocumentSchema = new schema(
    {
        nom: String,
        description:String,
        chemin: String,
        author:{
            type: schema.Types.ObjectId ,
            ref: 'User'
        },
        date_depot: Date,

    }
)
module.exports=mongoose.model('Document',DocumentSchema)