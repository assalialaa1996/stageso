const mongoose = require("mongoose")
const schema = mongoose.Schema
const StageSchema = new schema(
    {
        sujet:{
            type:String
        },
        documents:[
            {
                type:schema.Types.ObjectId,
                ref:'Document'
            }
        ],
        date_deb:{
            type:Date
        },
        date_fin:{
            type:Date
        },
        type:{
            type: schema.Types.ObjectId,
            ref: 'TypeStage'
        },
        cahier:[
            {
                journee:{
                    type: Date
                },
                tache:String,
                description:String,
                remarque: String
            }
        ],
        user:[
            {
                type: schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
)
module.exports= Stage = mongoose.model('Stage',StageSchema)