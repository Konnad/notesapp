const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


// Tässä käytin hyvin pitkälti valmista mallia tämän filun tekemiseen. Ei vielä aivot käsitä tätä authentikaatio
// tsyedeemiä täysin. Kuitenkin tästä koodista ymmärrän asioita, mutta en usko, että saisin ihan heti itse
// tämmöistä aikaan :D
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Rekisteröidään käyttäjä ja sille JWT token. Samalla tarkistetaan, ettei samaa käyttäjänimeä
// Ole jo aikaisemmalla käyttäjällä käytössä. Jos on, niin siitä ilmoitetaan. 
const authenticationController = {
  signup(req, res) {
    try {
      const { username, password } = req.body;
      // Tarkistetaan onko käyttäjänimi jo käytössä. Jos on niin error, jos ei niin Null -> Jatketaan seuraavaan
      User.findOne({ username }).then(existingUser => {
        if (existingUser) {
          return res.status(400).json({ error: 'Username is already taken' });
        }
        // Hashataan password, jottei sitä voi tietokannasta urkkia.
        bcrypt.hash(password, 10).then(hashedPassword => {
          const newUser = new User({ username, password: hashedPassword });
          newUser.save().then(() => {
            const token = generateToken(newUser._id);
            res.status(201).json({ token });
          });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

 // Kirjaudu sisään metodi
  login(req, res) {
    try {
      const { username, password } = req.body;
      // ilmoitetaan jos kumpikaan kirjautumistiedoista on väärin. Ei kuitenkaan ilmoiteta tarkemmin, että kumpi
      // on väärin, vaan yleisesti että jompikumpi.
      User.findOne({ username }).then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }

        bcrypt.compare(password, user.password).then(passwordMatch => {
          if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }

          const token = generateToken(user._id);
          res.json({ token });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = authenticationController;
