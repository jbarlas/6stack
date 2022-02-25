import React, { Component } from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    Spinner
} from 'reactstrap';
import { connect } from 'react-redux';
import { addPlayer } from '../actions/playerActions';

class PlayerModal extends Component {
    state = {
        modal: false,
        loading: false,
        battleTag: '',
    }

    toggle = () => {
        this.setState({ 
            modal: !this.state.modal,
        });
    }

    setLoading = () => {
        this.setState({ 
            loading: !this.state.loading
        });
    }

    onChange = (e) => {
        this.setState({ battleTag: e.target.value });
    }


    getPlayer = async(player) => {
        let newPlayer = player;
        await fetch(`https://ow-api.com/v1/stats/pc/us/${ newPlayer.battleTag }/complete`)
            .then(response => response.json())
            .then(json => {
            const priv = json.private;
            if (priv){
                newPlayer.avgsr = "N/A";
            } else {
                const herosPlayed = Object.entries(json.competitiveStats.topHeroes);
                console.log(herosPlayed);
                const sortedHeros = herosPlayed.sort((a, b) => {
                    let a_greater = true;
                    if (a[1].timePlayed.length < b[1].timePlayed.length) {
                        a_greater = false;
                    } else if (a[1].timePlayed.length > b[1].timePlayed.length) {
                        a_greater = true;
                    } else {
                        a_greater = a[1].timePlayed > b[1].timePlayed;
                    }
                    return (a_greater ? -1 : 1);
                });
                console.log(sortedHeros);
                let topHeros = [];
                if (sortedHeros.length > 5) {
                    topHeros = sortedHeros.slice(0, 5);
                } else {
                    topHeros = sortedHeros;
                }
                const ratings = json.ratings;
                for (const r in ratings)  {
                const hero = ratings[r];
                console.log(hero);
                if (hero.role === "tank"){
                    newPlayer.tanksr = hero.level;
                } else if (hero.role === "damage") {
                    newPlayer.dmgsr = hero.level;
                } else if (hero.role === "support") {
                    newPlayer.suppsr = hero.level;
                };
                }
                newPlayer.avgsr = json.rating;
                newPlayer.topHeros = topHeros.map(hero => hero[0]).join(', ');
            };
            console.log("newplayer here", newPlayer);
            this.props.addPlayer(newPlayer);
            })
            .catch(error => {
            window.alert(error);
            return;
            });
    }

    onSubmit = (e) => {
        e.preventDefault();

        let newPlayer = {
            battleTag: this.state.battleTag,
        }

        this.getPlayer(newPlayer)
        
        // close modal
        this.toggle();
    }

    render() {
        return(
            <div>
                <Button
                    color='dark'
                    style={{marginBottom:'2rem'}}
                    onClick={this.toggle}
                    >Add Player
                </Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add player to team</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='player'>Player</Label>
                                <Input
                                    type='text'
                                    name='battleTag'
                                    id='player'
                                    placeholder='Add player to team'
                                    onChange={this.onChange}
                                />
                                <Button
                                    color='dark'
                                    style={{marginTop: '2rem'}}
                                    type='submit'
                                    block>
                                    Add Player
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    player: state.player
});

export default connect(
    mapStateToProps, 
    { addPlayer }
) (PlayerModal);