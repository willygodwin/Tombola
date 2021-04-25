import React, {useEffect} from 'react';
import AppMaster from './../pages/layout/app/AppMaster'
import PostContainer from '../containers/newsfeed/PostContainer';
import axios from 'axios'

function Wall(){

    useEffect(() => {
        axios.get('http://localhost:3001/api/newsfeed', {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response);
                
            }).catch((err) => {
                console.log({err});
                if(err.response.status === 401){
                    
                }
            })
    }, [])

    


    return (
        <AppMaster>
            <PostContainer/>

            {/* profile page */}
            {/* profile page */}


        </AppMaster>
    )


}

export default Wall;