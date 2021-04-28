import React, {useEffect, useState} from 'react';
import { useHistory, useParams} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ImageCarousel from './ImageCarousel';
import Grid from '@material-ui/core/Grid';
import moment from 'moment'

import PostCard from './PostCard'
import axios from 'axios'







function ViewPostContainer(){

    const history = useHistory();
    let { id } = useParams();
    const [post, setPost] = useState([])
    console.log(id);


   
    useEffect(() => {
        axios.get(`http://localhost:3001/api/posts/${id}`, {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response);
                setPost(response.data.data)
            }).catch((err) => {
                console.log({err});
                if(err.response.status === 401){
                    
                }
            })
    }, [])

    console.log(post);

    

    // text area
    return (
        
        <Box>
            <Container>
                {/* text area to create new post */}
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <ImageCarousel post={post}/>
                    {/* <img src="/images/yeezy.jpg" alt=""/> */}
        
                
                </Grid>
                <Grid item xs={12} sm={6}>
                    <PostCard post={post}></PostCard>
                    
                </Grid>
                <Grid item xs={12} sm={12}>
                    
                    
                    <Typography gutterBottom variant="caption" component="p">
                            LISTED {moment(post.createdAt).from(moment()).toLocaleUpperCase()}
                            {/* {moment(props.post[0].createdAt).format("Do MMMM YYYY")} */}
                    </Typography>
                </Grid>

            </Grid>

                {/* <PostCard/> */}

{/*               
                 
                    <PostCard
                        index={0}
                        key={post._id} 
                        post={post} 
                    /> */}
             
            </Container>
        </Box>
    );
}
export default ViewPostContainer;