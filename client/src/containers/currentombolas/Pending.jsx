import React, { useEffect, useRef, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import WheelSpinner from "../../components/wheelspinner/WheelSpinner";


function Pending(props) {

    return (
        <div>
            <WheelSpinner won={true} ticket={props.tombolas[0]}></WheelSpinner>
            <Typography gutterBottom variant="body1" component="p" style={{ fontWeight: 'bold', color: 'black', marginBottom: '0px' }}>
                Upcoming Tombolas
                            </Typography>

            <table style={{ width: '100%' }}>
                <thead>
                    <th>Tombola Title</th>
                    <th>Tickets Bought</th>
                    <th>Ticket Percentage</th>
                    <th>Posted By</th>
                    <th>Tickets Remaining</th>
                    <th>Total Price</th>

                </thead>


                {props.tombolas.map((tombola, i) => {
                    if (!tombola.post.isClosed) {

                        return (
                            <tbody>
                                <tr>

                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <Link to={`/posts/${(tombola.post._id).toString()}`} >
                                                <Avatar alt="Kanye" src={tombola.post.image_refs[0]} style={{ width: '2rem', height: '2rem' }} />
                                            </Link>
                                            <Link to={`/posts/${(tombola.post._id).toString()}`} >
                                                <Typography gutterBottom variant="body1" component="p" style={{ color: 'black', marginBottom: '0px', marginLeft: '0.5rem' }}>
                                                    {tombola.post.title}
                                                </Typography>
                                            </Link>
                                        </div>
                                    </td>
                                    <td>

                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.5rem' }}>
                                            <FontAwesomeIcon icon={faTicketAlt} size="sm" style={{ marginRight: '0.25rem', transform: "rotate(135deg)" }} />
                                            {tombola.no_tickets_bought}

                                        </div>
                                    </td>
                                    <td>

                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.5rem' }}>

                                            {tombola.no_tickets_bought / tombola.post.no_tickets * 100}%

                                                    </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <Link to={`/posts/${(tombola.post._id).toString()}`} >
                                                <Avatar alt="Kanye" src={tombola.post.image_refs[0]} style={{ width: '2rem', height: '2rem' }} />
                                            </Link>
                                            <Link to={`/posts/${(tombola.post._id).toString()}`} >
                                                <Typography gutterBottom variant="body1" component="p" style={{ color: 'black', marginBottom: '0px', marginLeft: '0.5rem' }}>
                                                    {tombola.post.title}
                                                </Typography>
                                            </Link>
                                        </div>
                                    </td>
                                    <td>

                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.5rem' }}>
                                            <FontAwesomeIcon icon={faTicketAlt} size="sm" style={{ marginRight: '0.25rem', transform: "rotate(135deg)" }} />
                                            {tombola.post.no_tickets_remaining}

                                        </div>
                                    </td>
                                    <td>

                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.5rem' }}>
                                            <FontAwesomeIcon icon={faTicketAlt} size="sm" style={{ marginRight: '0.25rem', transform: "rotate(135deg)" }} />
                                            {tombola.post.total_price}

                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        )
                    }

                    return
                })}

            </table>
        </div>
    )
}

export default Pending