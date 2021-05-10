import React, {useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { useHistory, useParams} from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import moment from 'moment'


import axios from 'axios'
import ProfileImageGrid from './ProfileImageGrid';
import ProfileHeader from './ProfileHeader'







function ProfileContainer(){

    const history = useHistory();
    let { id } = useParams();
    const [posts, setPosts] = useState([])
    const [userInfo, setUserInfo] = useState([])
    console.log(id);


   
    useEffect(() => {
        axios.get(`/api/profile/${id}`, {
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
    }, [id])

    useEffect(() => {
        axios.get(`/api/followinfo/${id}`, {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response);
                setUserInfo(response.data.data)
            }).catch((err) => {
                console.log({err});
                if(err.response.status === 401){
                    
                }
            })
    }, [id])

    

    
    console.log(posts);
    console.log(userInfo);
    

    // text area
    return (
        
        <Box>
            <Container style={{paddingTop:'10px'}}>
                {/* text area to create new post */}
                <Grid container spacing={3}>
                
                <Grid item xs={12} sm={12} style={{backgroundColor:'rgba(0, 0, 0, 0)'}}>
                    
                <ProfileHeader user={userInfo} noPosts={posts.length} style={{backgroundColor:'rgba(0, 0, 0, 0)'}}></ProfileHeader>
                
                   
                </Grid>

            </Grid>
         
            <div style={{height: '25px',  zIndex:'10000'}}></div>
            <hr style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
            <div style={{height: '15px',  zIndex:'10000'}}></div>
            <ProfileImageGrid posts={posts}/>

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
export default ProfileContainer;