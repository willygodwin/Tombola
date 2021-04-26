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
            .get(`http://localhost:3001/api/comments?post_id=${(props.post[0]._id).toString()}`, { withCredentials: true })
            .then((response) => {
                
                setComments(response.data.data);
            });
    };

    const classes = useStyles();

    const images = () => {
        
        return props.post[0].image_refs.map((image) => {
            return (<div>
                    <h3 style={contentStyle}>{image}</h3>
                    </div>)
        })
    } 

   
    function onChange(a, b, c) {
        console.log(a, b, c);
      }

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };
      
      return(
        <Card className={classes.postItem}>
            <CardContent>
                <Carousel afterChange={onChange}>
                {images()}
     
                </Carousel>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.post[0].title}
                </Typography>

                <Typography gutterBottom variant="caption" component="p">
                    {/* {props.post[0].user.email} posted on{" "} */}
                    {moment(props.post[0].createdAt).format("Do MMMM YYYY")}
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                    {props.post[0].body}
                </Typography>

                <CommentList 
                    comments={comments}
                    toggleComments={toggleComments}
                    post={props.post[0]} postIndex={props.postIndex} 
                />
            </CardContent>
            <CardActions>
                <NewComment
                    addComment={addComment}
                    post={props.post[0]}
                />
            </CardActions>
        </Card>  
        
      );
}

export default PostCard
