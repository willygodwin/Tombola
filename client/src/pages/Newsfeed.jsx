import React, { useEffect } from 'react';
import AppMaster from './../pages/layout/app/AppMaster'
import PostContainer from '../containers/newsfeed/PostContainer';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import CurrentRaffles from '../components/currentraffles/CurrentRaffles';

function Newsfeed() {

    useEffect(() => {
        axios.get('/api/newsfeed', {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response);

            }).catch((err) => {
                console.log({ err });
                if (err.response.status === 401) {

                }
            })
    }, [])




    return (
        <AppMaster>
            <Grid item xs={12} sm={2} style={{ paddingTop: '0px' }}>
                
            </Grid>
            <Grid item xs={12} sm={6} style={{ paddingTop: '0px' }}>
                <PostContainer />
            </Grid>
            <Grid item xs={12} sm={2} style={{ paddingTop: '0px' }}>
                <CurrentRaffles></CurrentRaffles>
            </Grid>
            <Grid item xs={12} sm={2} style={{ paddingTop: '0px' }}>
                
            </Grid>


            {/* profile page */}
            {/* profile page */}


        </AppMaster>
    )


}

export default Newsfeed;