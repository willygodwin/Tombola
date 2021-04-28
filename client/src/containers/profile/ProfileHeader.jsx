import React, {useEffect, useState} from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));

function ProfileHeader(props) {
    const classes = useStyles();
    console.log(props);

    const renderList = () =>{
        console.log('props', props.post);
        if(props.user.length === 0){
            return (<div>Loading.....</div>)
        }


        return (
            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        
                        <Avatar alt="Kanye" src="/images/kanye.png" className={classes.large}/>
                        <Typography gutterBottom variant="h5" component="h2" style={{ marginBottom: '0px', marginLeft:'1rem'}}>
                        {props.user[0].name}
    
                        </Typography>
                        <div>


                        {props.user[0].followedby.length} Followers
                        </div>

                        <div>

                        {props.user[0].isfollowing.length} Following
                        </div>
                        

                        
            </div>
        )
    }

    return(
        <div style={{ height:'100px', width:'100%', zIndex:10000, backgroundColor:'rgb(255 255 255)'}}>
            
            {renderList()}
        </div>
      
      
    );
}


export default ProfileHeader