import React from 'react';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";


import NewPost from './NewPost'





function UploadContainer() {




    // text area
    return (
        <Box>
            <Container>
                <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px', marginTop:'10px' }}>
                    Upload a new Tombola
                </Typography>
                <Card >
                    <CardContent>

                        <NewPost></NewPost>
                    </CardContent>
                </Card>




            </Container>
        </Box>
    );
}
export default UploadContainer;