import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import axios from 'axios'
import FileList from './FileList'





function UploadContainer(){




    // text area
    return (
        <Box>
            <Container>
                {/* text area to create new post */}
                

                <Typography variant="h4">
                    See what others are up to...
                </Typography>
                {/* <PostCard/> */}

                {/* {posts.map((post, index) => {
                    const postEdit = [post]
                    return <PostCard
                        postIndex={index} 
                        key={post._id} 
                        post={postEdit} 
                    />
                })} */}
                <FileList></FileList>
            </Container>
        </Box>
    );
}
export default UploadContainer;