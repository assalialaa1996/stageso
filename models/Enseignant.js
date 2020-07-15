const mongoose = require("mongoose")
const schema = mongoose.Schema

const EseignantSchema = new schema(
    {
        user:{
            type: schema.Types.ObjectId,
            ref: 'User'
        },
        nom:{
            type: String
        },
        prenom:{
            type: String
        },
        adresse:{
            type:String
        },
        tel:{
            type: String
        },
        mail:{
            type: String
        },
        date_naiss:{
            type: String
        },
        fonction:{
            type: String
        },
        jury:[{
            stage:{
                type: schema.Types.ObjectId,
                ref: 'Stage'
            },
            date_affectation: Date,


         } ],
        encadrements: [{
            stage:{
                type: schema.Types.ObjectId,
                ref: 'Stage'
            },
            date_affectation: Date
        }],
        demandes:[
            {
                stage:{
                    type: schema.Types.ObjectId,
                    ref: 'Stage'
                },
                date_demande: Date
            }
        ]
    }
)
module.exports= EseignantSchema = mongoose.model('Encadreur',EseignantSchema)