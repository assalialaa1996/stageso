const mongoose = require("mongoose")
const schema= mongoose.Schema;

const EtudiantSchema =new mongoose.schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    nom: {
        type: String
    },
    prenom: {
        type:String
    },
    adresse: {
        type: String
    },
    tel:{
        type:String
    },
    date_naiss:{
        type: Date
    },
    sexe:{
        type: String
    },
    specialite: {
        type: schema.Types.ObjectId,
        ref: 'Specialite'
    },
    mail:{
        type: String
    },
    stages:[
        {
            stage_info:{
                type:schema.Types.ObjectId,
                ref : 'Stage'
            },
            etat: String,
            remarque: String
        }
    ],
    skills:[
        {type: String}
    ],
    social:{
        linkedin:String,
        twitter:String,
        facebook:String
    }

}

)
module.exports = Etudiant = mongoose.model('Etudiant', EtudiantSchema);