import React from 'react';
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment'
import CommentList from './CommentList';
import NewComment from './NewComment';
import { useState } from 'react';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '@material-ui/core';
import BuyModal from '../../components/buy/BuyModal'





const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    postItem: {
        marginTop: 30,
        marginBottom: 30,
    },
});

function PostCard(props) {

    const [comments, setComments] = useState([]);


    const addComment = (comment) => {
        setComments([
            ...comments,
            comment
        ])
    };


    const toggleComments = (hide = false) => {
        if (hide) {
            return setComments(null);
        }
        axios
            .get(`/api/comments?post_id=${(props.post[0]._id).toString()}`, { withCredentials: true })
            .then((response) => {

                setComments(response.data.data);
            });
    };

    const classes = useStyles();

    const handleClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
    }


    function onChange(a, b, c) {
        console.log(a, b, c);
    }

    const contentStyle = {
        height: '400px',
        width: 'inherit'

    };

    const renderList = () => {
        console.log('props', props.post);
        if (props.post.length === 0) {
            return (<div>Loading.....</div>)
        }



        return (
            <div>

                <Link to={`/profile/${props.post.user._id}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                    <Avatar alt="Kanye" src="/images/kanye.png" />
                    <Typography gutterBottom variant="h5" component="h2" style={{ marginBottom: '0px', marginLeft: '1rem' }}>
                        {props.post.user.name}
                        {/* <div style={{fontSize:'10px', display:'flex', alignItems:'center'}}>
                {props.post[0].title}
                
                </div> */}
                    </Typography>

                </Link>
                <hr style={{ color: 'rgba(0, 0, 0, 0.54)' }} />



                <Typography variant="body1" color="textSecondary" component="p" style={{ display: 'flex', alignItems: 'center', }}>
                    {props.post.title}
                </Typography>
                <p style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                    {props.post.description}
                </p>
                <table style={{ width: '100%', marginBottom: '20px' }}>
                    <tbody>
                        <tr>
                            <th >Total Price</th>
                            <td>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.5rem' }}>
                                    <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '0.25rem', color: '#fea82f' }} />
                                    {props.post.total_price}
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <th>Ticket Price</th>
                            <td>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.5rem' }}>
                                    <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '0.25rem', color: '#fea82f' }} />
                                    {props.post.price_per_ticket}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Total Tickets</th>
                            <td>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.5rem' }}>
                                    <FontAwesomeIcon icon={faTicketAlt} size="sm" style={{ marginRight: '0.25rem', transform: "rotate(135deg)", color: '#fea82f' }} />
                                    {props.post.no_tickets}

                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Tickets Remaining</th>
                            <td>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.5rem' }}>
                                    <FontAwesomeIcon icon={faTicketAlt} size="sm" style={{ marginRight: '0.25rem', transform: "rotate(135deg)", color: '#fea82f' }} />
                                    {props.post.no_tickets_remaining}

                                </div>
                            </td>
                        </tr>
                    </tbody>



                </table>
                <div >
                    <BuyModal post={props.post}></BuyModal>

                    {/* <a style={{width: '100%',height: '2rem', display: 'flex', justifyContent: 'center',  alignItems: 'center',backgroundColor:'rgba(0, 0, 0, 0.54)',color:'white'}} href={`/buytickets/${props.post.id}`}>Buy Tickets</a> */}
                </div>
            </div>
        )

    }

    return (
        <div>

            {renderList()}
        </div>


    );
}

export default PostCard
