const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');



// Express APIs
const auth = require('./routes/auth.routes');
const stage = require('./routes/stage.routes');
const forum = require('./routes/forum.routes')
const etudiant= require('./routes/etudiant.routes')
const enseignat = require('./routes/enseignant.routes')
const typestage = require('./routes/typestage.routes')
const specialite = require('./routes/specialite.routes')
const document = require('./routes/document.routes')
const tache = require('./routes/tache.routes')


// MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected')
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);


// Express settings
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// Serve static resources
app.use('/public', express.static('public'));

app.use('/api', auth)
app.use('/api/stages',stage)
app.use('/api/taches',tache)
app.use('/api/documents',document)
app.use('/api/specialites',specialite)
app.use('/api/forum',forum)
app.use('/api/etudiant',etudiant)
app.use('/api/enseignant',enseignat)
app.use('/api/typestages',typestage)


// Define PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});