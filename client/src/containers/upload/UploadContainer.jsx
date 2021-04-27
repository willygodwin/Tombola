import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import axios from 'axios'

import NewPost from './NewPost'





function UploadContainer(){




    // text area
    return (
        <Box>
            <Container>


                <NewPost></NewPost>
       
                
            </Container>
        </Box>
    );
}
export default UploadContainer;