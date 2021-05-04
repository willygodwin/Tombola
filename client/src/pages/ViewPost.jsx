import React from 'react';
import AppMaster from './layout/app/AppMaster'
import ViewPostContainer from '../containers/viewpost/ViewPostContainer';
import Grid from '@material-ui/core/Grid';


function ViewPost() {




    return (
        <AppMaster>
            <Grid item xs={12} sm={6} style={{ paddingTop: '0px' }}>
                <ViewPostContainer />
            </Grid>


            {/* profile page */}
            {/* profile page */}


        </AppMaster>
    )


}

export default ViewPost;