const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

// Team model
const Team = require('../../models/Team');

// @route   GET api/teams
// @desc    get all teams
// @access  Public
router.get('/', (req, res) => {
    Team.find()
        .then(teams => res.json(teams))
});

// @route   POST api/teams
// @desc    create a player 
// @access  Public
router.post('/add', (req, res) => {
    const newTeam = new Team({
        name: req.body.name,
        players: req.body.players,
    });

    newTeam.save()
        .then(team => res.json(team));
});

// @route   POST api/teams/:id
// @desc    update a team 
// @access  Public
router.post('/update/:id', (req, res) => {
    Team.findOneAndUpdate(
        {id : req.body._id},
        { $set : {
            name: req.body.name,
            players: req.body.players,
            }
        })
        .then(res.json(req.body))
        .catch(err => res.status(404).json({success : false}));
});

// @route   DELETE api/teams/:id
// @desc    delete a team 
// @access  Public
router.delete('/delete/:id', (req, res) => {
    Team.findById(req.params.id)
        .then(team => team.remove().then(() => res.json({success : true})))
        .catch(err => res.status(404).json({success : false}));
})





module.exports = router;