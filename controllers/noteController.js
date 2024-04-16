// Tänne tulee kaikki CRUD metodit

const Note = require('../models/Note'); // Haetaan model
const User = require('../models/user');

// Tietokannan käsittelymetodit tehdään tämän olion sisään
// Metodeiden luonnissa on käytetty mallina kurssin tehtäviä.

const NoteController = {
  // Get pyynnöt
  // Noudetaan kaikki notesit kannasta
  getAllNotes(req, res) {
    Note.find().then((notes) => {
      res.json(notes);
    }).catch((error) => {
      throw error;
    });
  },

  // Haetaan id:n perusteella note
  findById(req, res){
    Note.findOne({_id: req.params.id}).then((note) => {
      res.json(note);
    }).catch((err) => {
      console.log(err);
    })
  },

  // Lisätään uusi note
  addNewNote(req, res) {
    const newNote = Note(req.body);
    Note.create(newNote)
      .then((note) => {
        console.log('document inserted: ' + note);
        res.json(note);
      }).catch((err) => {
          console.error(err);
      })
  },

  // Muokataan jo olemassa olevaa notea
  updateNote(req, res) {
    Note.findByIdAndUpdate(req.params.id, req.body,)
    .then((result) => {
    console.log('Note updated: ' + result);
    res.json(result);
  }).catch((err) => {
    console.log(err);
  })
  },

  // poistetaan muistiinpano
  removeNote(req, res) {
    Note.findOneAndDelete({_id: req.params.id})
      .then((note) => {
        res.json(note);
      })
      .catch((error) => {
        console.log(error)
      });
  },

  // Hae random muistiinpano. Voisi sopia esim tilanteeseen jos sivulle halutaan toiminto joka
  // rollaa sinulle tekemistä kaikista käyttäjien tekemistä muistiinpanoista jotka ovat julkisia. Eli noten
  // "isPublic" arvon pitää olla true.
  rollNote(req, res) {
    // Haetaan vain julkiset notet
    const matchStage = { $match: {isPublic: true}};

    // Lisätään uusi fieldi jokaiseen dokumenttiin jossa on satunnaisarvo
    const addFieldsStage = {
      $addFields: {
        randomValue: {$rand: {}}
      }
    };

    // Järjestetään dokumentit randomValuen arvon mukaan
    const sortStage = { $sort: {randomValue: 1}};
    const limitStage = { $limit: 1};

    // Pipelinetaan staget aggregationia varten
    const pipeline = [matchStage, addFieldsStage, sortStage, limitStage];

    Note.aggregate(pipeline)
      .then((randomNote) => {
        if (!randomNote || randomNote.length === 0) {
          // Ei löydy julkisia muistiinpanoja
          return res.status(404).json({message: "No notes found"});
        }
        // Palauta satunnainen julkinen muistiinpano
        res.json(randomNote[0]);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error '});
      })
  },
};





module.exports = NoteController;
