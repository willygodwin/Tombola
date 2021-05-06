import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ExploreGrid from './ExploreGrid'
import axios from 'axios'





function UploadContainer(){

    const history = useHistory();
    const [posts, setPosts] = useState([])


    // call post api to load all the post in page
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
                

                <ExploreGrid posts={posts}/>

              
            </Container>
        </Box>
    );
}
export default UploadContainer;