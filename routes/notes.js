// Määritellään required kirjastot
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController'); // nc = noteController
const authMiddleware = require('../middleware/authMiddleware');

// Määritellään routet perus CRUD toimintoihin

// hae notet
// localhost:3000/notes/
router.get('/', noteController.getAllNotes);

// localhost:3000/notes/6617f2979b98444c4de7a7fe
// Haetaan Id:n perusteella note
router.get('/:id', noteController.findById);


// localhost:3000/notes/
// Lisää noten, pitää olla kirjautuneena sisään. JWT-tokenin avulla authentikoidaan käyttäjä, ja lisätään
// note käyttäjän tietoihin. 
router.post('/', authMiddleware.authenticate, noteController.addNewNote);


// localhost:3000/notes/updatenote/6617f2cd4493bab9fcc308c4
// Päivittää noten id:n perusteella, pitää olla kirjautunut sisään. Tämä ei kuitenkaan taida tarkistaa,
// että onko note kirjautuneena olevan käyttäjän luoma, vaan se poistaa noten siitä huolimatta.
router.put('/updatenote/:id', authMiddleware.authenticate, noteController.updateNote);

// localhost:3000/notes/661e5092d9409a8fc9418229
// Sama homma kuin yllä, riittää että on kirjautuneena sisään niin tällä voi poistaa mitä tahansa noteja,
// riippumatta siitä, onko note sisäänkirjautuneen käyttäjän note vai ei.
router.delete('/:id', authMiddleware.authenticate, noteController.removeNote);

/*
    Noihin kahteen ylempään routeen olisi ollut hyvä tietokantaa suunnitellessa jo lisätä noteihin
    vaikka joku "createdBy" sarake, joka olisi voinut kirjata ylös aina noten luojan id:n, jota kautta 
    nuo noten omistajaoikeudet olisi voinut tarkastaa ainakin oletettavasti helpommin. Juuri nyt tässä hetkessä
    en osaa ratkaista tätä kyseistä ongelmaa näillä nykyisillä tiedoilla mitä minulla on. Varmasti mahdollista
    näilläkin skeemoilla, mutta itselleni olisi ollut huomattavasti helpompi jos olisin voinut suoraan
    noten kautta vertailla sisään kirjautuneen käyttäjän usernamea / id:tä ja tietokannassa olevaa "createdBy" saraketta.
    
    Tämä on kuitenkin vain suht nopeasti kyhätty Demo, enkä osaa / jaksa uppoutua tähän nyt hirveän syvästi.
*/

// localhost:3000/notes/notes/random
// Hae random muistiinpano.
router.get('/notes/random', noteController.rollNote);

module.exports = router;