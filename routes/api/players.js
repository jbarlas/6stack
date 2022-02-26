const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

// Player model
const Player = require('../../models/Player');

// @route   GET api/players
// @desc    get all players
// @access  Public
router.get('/', (req, res) => {
    Player.find()
        .then(players => res.json(players))
});

// @route   POST api/players
// @desc    create a player 
// @access  Private
router.post('/add', auth, (req, res) => {
    const newPlayer = new Player({
        battleTag: req.body.battleTag,
        avgsr: req.body.avgsr,
        tanksr: req.body.tanksr,
        dmgsr: req.body.dmgsr,
        suppsr: req.body.suppsr,
        topHeros: req.body.topHeros
    });

    newPlayer.save()
        .then(player => res.json(player));
});

// @route   POST api/teams/:id
// @desc    update a team 
// @access  Private
router.post('/update/:id', auth, (req, res) => {
    Player.updateOne(
        {id : req.params.id},
        { $set : {
            battleTag: req.body.battleTag,
            avgsr: req.body.avgsr,
            tanksr: req.body.tanksr,
            dmgsr: req.body.dmgsr,
            suppsr: req.body.suppsr,
            topHeros: req.body.topHeros
            }
        })
        .then(res.status(200).json({ success: true }))
        .catch(err => res.status(404).json({success : false}));
});

// @route   DELETE api/players/:id
// @desc    delete a player 
// @access  Private
router.delete('/delete/:id', auth, (req, res) => {
    Player.findById(req.params.id)
        .then(player => player.remove().then(() => res.json({success : true})))
        .catch(err => res.status(404).json({success : false}));
})





module.exports = router;