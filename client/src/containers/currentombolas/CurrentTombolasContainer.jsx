import React, { useEffect, useRef, useState } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Avatar, Button } from '@material-ui/core';
import Pending from "./Pending";
import Won from "./Won";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    postItem: {
        marginTop: 30,
        marginBottom: 30,

        width: '100%'
    },
});


function CurrentTombolasContainer() {
    const [tombolas, setTombolas] = useState([]);
    const [won, setWon] = useState(false)
    const classes = useStyles();
    useEffect(() => {

        getCurrentTombolas()
            .then((response) => {
                console.log(response);

                setTombolas(response.data)

            });


    }, []);

    const onWon = () => {
        setWon(true)

    }

    const onPending = () => {
        setWon(false)

    }


    const getCurrentTombolas = () => {


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

            {
                tombolas.length === 0 ? <div></div> :


                    <Card className={classes.postItem} >
                        <CardContent>
                            <div style={{ textAlign: 'center', marginBottom:'20px' }}>
                                <Button onClick={onWon} style={{backgroundColor:won?'#fea82f8f':''}}>Won</Button>
                                <Button onClick={onPending} style={{backgroundColor:!won?'#fea82f8f':''}}>Pending</Button>
                            </div>
                            {won ? <Won tombolas={tombolas}/>:<Pending tombolas={tombolas}/>}

                        </CardContent>
                    </Card>
            }
        </div>
    )


}

export default CurrentTombolasContainer