import React, { useEffect, useRef, useState } from "react";
import ModalNotification from './ModalNotification'
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt  } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    postItem: {
        marginTop: 30,
        marginBottom: 30,
        position: "fixed",
        width: '220px'
    },
});


function CurrentRaffles() {
    const [raffles, setRaffles] = useState([]);
    const classes = useStyles();
    useEffect(() => {

        getCurrentRaffles()
            .then((response) => {
                console.log(response);

                setRaffles(response.data)

            });


    }, []);


    const getCurrentRaffles = () => {


        return fetch(`http://localhost:3001/api/currentraffles`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'

            },
        })
            .then((res) => res.json())

    }


    return (
        <div>
            <ModalNotification ticket={raffles}></ModalNotification>
            {
                raffles.length === 0 ? <div></div> :


                    <Card className={classes.postItem} >
                        <CardContent>
                            <Typography gutterBottom variant="body1" component="p" style={{ fontWeight: 'bold', color: 'black', marginBottom: '0px' }}>
                                Current Tombolas
                            </Typography>
                            {raffles.map((raffle, i) => {
                                if (i < 5) {
                                    return (
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                                            <Link to={`/posts/${(raffle.post._id).toString()}`} >
                                                <Avatar alt="Kanye" src={raffle.post.image_refs[0]} style={{ width: '2rem', height: '2rem' }} />
                                            </Link>
                                            <Link to={`/posts/${(raffle.post._id).toString()}`} >
                                                <Typography gutterBottom variant="body1" component="p" style={{ color: 'black', marginBottom: '0px', marginLeft: '0.5rem' }}>
                                                    {raffle.post.title}
                                                </Typography>
                                            </Link>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.5rem' }}>
                                                <FontAwesomeIcon icon={faTicketAlt} size="sm" style={{ marginRight: '0.25rem', transform: "rotate(135deg)" }} />
                                                {raffle.no_tickets_bought}

                                            </div>
                                        </div>

                                    )
                                }
                                return
                            })}

                        </CardContent>
                    </Card>
            }
        </div>
    )


}

export default CurrentRaffles