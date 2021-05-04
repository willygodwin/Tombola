import React from 'react';
import AppMaster from './../pages/layout/app/AppMaster'
import UploadContainer from '../containers/upload/UploadContainer';
import Grid from '@material-ui/core/Grid';


function Upload() {




    return (
        <AppMaster>
            <Grid item xs={12} sm={6} style={{ paddingTop: '0px' }}>
                <UploadContainer />
            </Grid>


            {/* profile page */}
            {/* profile page */}


        </AppMaster>
    )


}

export default Upload;