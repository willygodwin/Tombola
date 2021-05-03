import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import axios from 'axios'

import PostCard from './PostCard';



function PostContainer(){

    const history = useHistory();
    const [posts, setPosts] = useState([])


    // call post api to load all the post in page
    useEffect(() => {
        axios.get('http://localhost:3001/api/newsfeed', {
            withCredentials: true,
        })
            .then((response) => {
                
                setPosts(response.data.data)
            }).catch((err) => {
                console.log({err});
                if(err.response.status === 401){
                    
                }
            })
    }, [])


    // text area
    return (
        
        <Box>
            <Container>
                {/* text area to create new post */}
                

                {/* <Typography variant="h4">
                    See what others are up to...
                </Typography> */}
                {/* <PostCard/> */}

                {posts.map((post, index) => {
                    const postEdit = [post]
                    return <PostCard
                        postIndex={index} 
                        key={post._id} 
                        post={postEdit} 
                    />
                })}
            </Container>
        </Box>
    );
}
export default PostContainer;