import React, { useEffect, useState } from "react";
import ModalNotification from './ModalNotification'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'


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
    const [tombolas, setTombolas] = useState([]);
    const classes = useStyles();
    useEffect(() => {

        getCurrentRaffles()
            .then((response) => {
                console.log(response);

                setTombolas(response.data)

            });


    }, []);


    const getCurrentRaffles = () => {


        return fetch(`/api/currentraffles`, {
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
            {tombolas.map((tombola) => <ModalNotification ticket={tombola}></ModalNotification>)}
            {
                tombolas.length === 0 ? <div></div> :


                    <Card className={classes.postItem} >
                        <CardContent>
                            <Typography gutterBottom variant="body1" component="p" style={{ fontWeight: 'bold', color: 'black', marginBottom: '0px' }}>
                                Current Tombolas
                            </Typography>
                            {tombolas.map((tombola, i) => {
                                if (tombola.post.isClosed) {
                                    return
                                }
                                if (i < 5) {
                                    return (
                                        <div key={tombola._id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                                            <Link to={`/posts/${(tombola.post._id).toString()}`} >
                                                <Avatar alt={tombola.post.image_refs[0].key} src={tombola.post.image_refs[0].location} style={{ width: '2rem', height: '2rem' }} />
                                            </Link>
                                            <Link to={`/posts/${(tombola.post._id).toString()}`} >
                                                <Typography gutterBottom variant="body1" component="p" style={{ color: 'black', marginBottom: '0px', marginLeft: '0.5rem' }}>
                                                    {tombola.post.title}
                                                </Typography>
                                            </Link>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.5rem' }}>
                                                <FontAwesomeIcon icon={faTicketAlt} size="sm" style={{ marginRight: '0.25rem', transform: "rotate(135deg)", color: '#fea82f' }} />
                                                {tombola.no_tickets_bought}

                                            </div>
                                        </div>

                                    )
                                }
                                return
                            })}

                            <Link to='/currenttombolas' style={{ color: '#ff6701' }}>
                                See More
                            </Link>

                        </CardContent>
                    </Card>
            }
        </div>
    )


}

export default CurrentRaffles