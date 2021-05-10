import React from 'react';
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
import BuyModal from '../../components/buy/BuyModal'
import ImageCarousel from '../../components/imagecarousel/ImageCarousel';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';



const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    postItem: {
        marginTop: 30,
        marginBottom: 30,
        padding: 0
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

    const images = () => {

        return props.post[0].image_refs.map((image, key) => {
            return (<div key={key}>
                {/* <h3 style={contentStyle}>{image}</h3> */}
                <img style={contentStyle} src={image}></img>
            </div>)
        })
    }


    function onChange(a, b, c) {
        console.log(a, b, c);
    }

    const contentStyle = {
        height: '400px',
        width: 'inherit'

    };

    return (
        <Link to={`/posts/${(props.post[0]._id).toString()}`}>

            <Card className={classes.postItem}>
                <CardContent style={{ padding: '0px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '1rem' }}>
                        <Link to={`/profile/${(props.post[0].user._id).toString()}`} >
                            <Avatar alt={props.post[0].user.profile_image.location} src={props.post[0].user.profile_image.location} />
                        </Link>
                        <Link to={`/profile/${(props.post[0].user._id).toString()}`} >
                            <Typography gutterBottom variant="body1" component="p" style={{ fontWeight: 'bold', color: 'black', marginBottom: '0px', marginLeft: '0.5rem' }}>
                                {props.post[0].user.name}
                            </Typography>
                        </Link>
                    </div>
                    {/* <Carousel afterChange={onChange}>

                {images()}
     
                </Carousel> */}
                    <ImageCarousel post={props.post[0]}></ImageCarousel>
                    <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', margin: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
                            <Link to={`/profile/${(props.post[0].user._id).toString()}`} >
                                <Typography gutterBottom variant="body1" component="p" style={{ fontWeight: 'bold', marginBottom: '0px', color: 'black' }}>
                                    {props.post[0].user.name}
                                </Typography>
                            </Link>

                            <Typography variant="body1" component="p" style={{ display: 'flex', alignItems: 'center', marginLeft: '0.25rem' }}>
                                {props.post[0].title}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" color="textSecondary" component="div" style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.5rem' }}>
                                    <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '0.25rem', color: '#fea82f' }} />
                                    {props.post[0].price_per_ticket}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.5rem' }}>
                                    <FontAwesomeIcon icon={faTicketAlt} size="sm" style={{ marginRight: '0.25rem', transform: "rotate(135deg)", color: '#fea82f' }} />
                                    {props.post[0].no_tickets_remaining}

                                </div>
                            </Typography>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', alignItems:'flex-end', margin: '1rem' }}>
                        <Typography gutterBottom variant="caption" component="p" style={{marginBottom: '0px'}}>
                            {moment(props.post[0].createdAt).from(moment()).toLocaleUpperCase()}
                            {/* {moment(props.post[0].createdAt).format("Do MMMM YYYY")} */}
                        </Typography>
                        <BuyModal post={props.post[0]}></BuyModal>
                    </div>
                    {/* <CommentList 
                        comments={comments}
                        toggleComments={toggleComments}
                        post={props.post[0]} postIndex={props.postIndex} 
                    /> */}


                    {/* <CardActions>
                    
                    <NewComment
                        addComment={addComment}
                        post={props.post[0]}
                    />
                </CardActions> */}



                    {/* <Typography variant="body2" color="textSecondary" component="p">
                    {props.post[0].body}
                </Typography> */}



                </CardContent>
                {/* <CardActions>
                <NewComment
                    addComment={addComment}
                    post={props.post[0]}
                />
            </CardActions> */}
            </Card>
        </Link>

    );
}

export default PostCard
