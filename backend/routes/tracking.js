const router = require('express').Router();
let Tracking = require('../models/tracking.model');

router.route('/').get((req, res) => {
    Tracking.find()
      .then(tracking => res.json(tracking))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newTracking = new Tracking({
        username,
        description,
        duration,
        date,
    });

    newTracking.save()
      .then(() => res.json('Tracking Added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Tracking.findById(req.params.id)
      .then(tracking => res.json(tracking))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Tracking.findById(req.params.id)
      .then(() => res.json('Tracking Deleted'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Tracking.findById(req.params.id)
      .then(tracking => {
          tracking.username = req.body.username;
          tracking.description = req.body.description;
          tracking.duration = Number(req.body.duration);
          tracking.date = Date.parse(req.body.date);

          tracking.save()
            .then(() => res.json('Tracking Updated!'))
            .catch(err => res.status(400).json('Error ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;