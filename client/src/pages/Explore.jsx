import React from 'react';
import AppMaster from './../pages/layout/app/AppMaster'
import ExploreContainer from '../containers/explore/explorecontent/ExploreContainer';
import SearchContainer from '../containers/explore/searchcontent/SearchContainer';
import Grid from '@material-ui/core/Grid';

function Explore(){

    


    return (
        <AppMaster>
            {/* <SearchContainer/> */}
            <Grid  item xs={12} sm={8} style={{paddingTop:'0px'}}>
            <ExploreContainer/>            
                </Grid>

            {/* profile page */}
            {/* profile page */}


        </AppMaster>
    )


}

export default Explore;