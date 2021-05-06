import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import axios from 'axios'
import ImageCarousel from '../../../components/imagecarousel/ImageCarousel'

import PostItem from './PostItem';
import NewPost from './NewPost';


function PostContainer(){

    const history = useHistory();
    const [posts, setPosts] = useState([])


    // call post api to load all the post in page
    useEffect(() => {
        axios.get('/api/posts', {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response);
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

                <ImageCarousel></ImageCarousel>
                
                <NewPost posts={posts} setPosts={setPosts}/>

                <Divider></Divider>

                <Typography variant="h4">
                    See what others are up to...
                </Typography>

                {posts.map((post, index) => (
                    <PostItem
                        postIndex={index} 
                        key={post._id} 
                        post={post} 
                    />
                ))}
            </Container>
        </Box>
    );
}
export default PostContainer;