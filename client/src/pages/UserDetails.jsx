import React from 'react';
import AppMaster from './../pages/layout/app/AppMaster'
import UserDetailsContainer from '../containers/userdetails/UserDetailsContainer';
import Grid from '@material-ui/core/Grid';


function UserDetails() {




    return (
        <AppMaster>
            <Grid item xs={12} sm={6} style={{ paddingTop: '0px' }}>
                <UserDetailsContainer />
            </Grid>

        </AppMaster>
    )


}

export default UserDetails;