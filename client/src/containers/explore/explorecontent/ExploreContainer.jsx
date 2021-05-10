import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ExploreGrid from './ExploreGrid'
import axios from 'axios'



function UploadContainer() {

    const [posts, setPosts] = useState([])


    // call post api to load all the post in page
    // call post api to load all the post in page
    useEffect(() => {
        axios.get('/api/posts', {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response);
                const openPosts = response.data.data.filter((post) => {
                    if (!post.isClosed) {
                        return post
                    }
                })
                console.log(openPosts);
                setPosts(openPosts)
            }).catch((err) => {
                console.log({ err });
                if (err.response.status === 401) {

                }
            })
    }, [])



    // text area
    return (
        <Box>
            <Container>


                <ExploreGrid posts={posts} />


            </Container>
        </Box>
    );
}
export default UploadContainer;