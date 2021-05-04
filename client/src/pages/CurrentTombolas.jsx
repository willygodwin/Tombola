import React from 'react';
import AppMaster from './../pages/layout/app/AppMaster'
import Grid from '@material-ui/core/Grid';
import CurrentTombolasContainer from '../containers/currentombolas/CurrentTombolasContainer';

function CurrentTombolas(){

    


    return (
        <AppMaster>
            {/* <SearchContainer/> */}
            <Grid  item xs={12} sm={8} style={{paddingTop:'0px'}}>
            <CurrentTombolasContainer/>            
                </Grid>

            {/* profile page */}
            {/* profile page */}


        </AppMaster>
    )


}

export default CurrentTombolas;