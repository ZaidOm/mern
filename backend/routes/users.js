const router = require('express').Router();
const User = require('../models/user.model');
const UserSession = require('../models/userSession.model');

router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const { body } = req;
    const {
      username,
      password
    } = body;

    let {
      email
    } = body;

    if(!username) {
      return res.send({
        success: false,
        message: 'Error: Username cannot be blank'
      });
    }
    if(!email) {
      return res.send({
        success: false,
        message: 'Error: email cannot be blank'
      });
    }
    if(!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank'
      });
    }

    email = email.toLowerCase();

  User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exists'
        });
      }
      // Save new User
      const newUser = new User();

      newUser.email = email;
      newUser.username = username;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      });
    });
});

router.route('/signin').post((req, res, next) => {
  const { body } = req;
  const {
    username,
    password
  } = body;

  if(!username) {
    return res.send({
      success: false,
      message: 'Error: Username cannot be blank'
    });
  }
  if(!password) {
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank'
    });
  }

  User.find({
    username: username
  }, (err, users) => {
    if (err) {
      console.log('err 2:', err);
      return res.send({
        success: false,
        message: 'Error: server error'
      });
    }
    if (users.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }
    const user = users[0];
    if (!user.validPassword(password)) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }
    // Otherwise correct user
    const userSession = new UserSession();
    userSession.userId = user._id;
    userSession.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      return res.send({
        success: true,
        message: 'Valid sign in',
        token: user._id
      });
    });
  });
});
    
router.route('/logout').get((req, res, next) => { 
    // Get Token
    const { query } = req;
    const { token } = query;
    // ?token = test
    // Verify token is unique
    UserSession.findOneAndUpdate({
      userId: token,
      isDeleted: false
    }, {
      $set:{isDeleted:true}
    }, null, (err) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Logged Out'
      });
    });
  });

module.exports = router;