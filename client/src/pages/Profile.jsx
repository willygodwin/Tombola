import React from 'react';
import AppMaster from './layout/app/AppMaster'
import ProfileContainer from '../containers/profile/ProfileContainer';
import Grid from '@material-ui/core/Grid';


function Profile() {




    return (
        <AppMaster>
            <Grid item xs={12} sm={8} style={{ paddingTop: '0px' }}>
                <ProfileContainer />
            </Grid>


            {/* profile page */}
            {/* profile page */}


        </AppMaster>
    )


}

export default Profile;