const mongoose = require("mongoose")
const schema = mongoose.Schema

const TacheSchema = new schema(
    {
        tache:{
            type: String
        },
        deadline:{
            type: String
        },
        done:{
            type: Boolean,
            default: false
        }
        
    }
)
module.exports= Tache = mongoose.model('Tache',TacheSchema)