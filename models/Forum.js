const mongoose = require ('mongoose')
const schema = mongoose.Schema

const ForumSchema = new schema(
    {
        sujet:{
            type: String
        },
        date:{
            type: Date,
            default: Date.now()
        },
        author:{
            type:schema.Types.ObjectId,
            ref: 'User'
        },
        comments:[ 
            {
                author:{
                    type:schema.Types.ObjectId,
                    ref: 'User'
                },
                content:{ 
                    type: String
                },
                date:{
                    type: Date,
                    default: Date.now()
                }
            }
        ]
    
    }
)
module.exports= mongoose.model('Forum',ForumSchema)