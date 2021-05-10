import React from 'react';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import UserDetailsForm from './UserDetailsForm'

function UserDetailsContainer() {

    // text area
    return (
        <Box>
            <Container>
                <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px', marginTop: '10px' }}>
                    Enter you profile details below
                </Typography>
                <Card >
                    <CardContent>

                        <UserDetailsForm></UserDetailsForm>
                    </CardContent>
                </Card>




            </Container>
        </Box>
    );
}
export default UserDetailsContainer;