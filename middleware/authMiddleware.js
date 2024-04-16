

// Tässä sama homma kuin authenticationControllerin kanssa. Tämä löytyi saman tutorialin alta.
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user associated with the token
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the user object to the request object for further use in the route handlers
    req.user = user;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { authenticate };
