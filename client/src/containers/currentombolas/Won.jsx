import React, { useEffect, useRef, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import WheelSpinner from "../../components/wheelspinner/WheelSpinner";


function Won(props) {

    return (
        <div>
            <Typography gutterBottom variant="body1" component="p" style={{ fontWeight: 'bold', color: 'black', marginBottom: '0px' }}>
                Tombolas Won
            </Typography>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexFlow: 'wrap', justifyContent: 'space-between' }}>

                {props.tombolas.map((tombola, i) => {
                    if (tombola.post.isClosed) {
                        if (tombola.post.winner_id === tombola.user_id) {

                            return (

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px', height: 'auto', }}>
                                    <Link to={`/posts/${(tombola.post._id).toString()}`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '10px' }}>
                                        <Typography gutterBottom variant="body1" component="p" style={{ color: 'black', marginBottom: '0px', }}>
                                            {tombola.post.title}
                                        </Typography>

                                    </Link>
                                    <Link to={`/posts/${(tombola.post._id).toString()}`} style={{position:'relative'}}>
                                        <Avatar alt={tombola.post.image_refs[0].key} src={tombola.post.image_refs[0].location} style={{ width: '250px', height: '250px' }} />
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.5rem', color: 'orange', position:'absolute', top:'47%', right:'45%' }}>
                                            <FontAwesomeIcon icon={faDollarSign} size="sm" style={{ color: 'orange', marginRight: '0.25rem' }} />
                                            {tombola.post.total_price}

                                        </div>
                                    </Link>



                                </div>

                            )
                        }
                    }

                    return
                })}
            </div>


        </div>
    )
}

export default Won