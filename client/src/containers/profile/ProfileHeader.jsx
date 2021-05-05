import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import Follow from '../../components/follow/FollowButton'
import GlobalStore from "../../utils/context/GlobalStore"; //../../utils/context/GlobalStore
import EditProfile from '../../components/edit/EditProfile'

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

function ProfileHeader(props) {
    const classes = useStyles();
    let { id } = useParams();
    console.log(props);
    const store = GlobalStore.useGlobalContext()
    console.log(store.auth.authState.currentUser._id);

    const renderList = () => {
        console.log('props', props.post);
        if (props.user.length === 0) {
            return (<div>Loading.....</div>)
        }


        return (
         
                <div style={{ display: 'flex', flexDirection: 'column', }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                        <Avatar alt="Kanye" src="/images/kanye.png" className={classes.large} />
                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Typography gutterBottom variant="h5" component="h2" style={{ marginBottom: '0px', marginLeft: '1rem' }}>
                                    {props.user[0].name}


                                </Typography>
                                {props.user[0]._id === store.auth.authState.currentUser._id ? <div></div> : <Follow id={id}></Follow>}
                            </div>


                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '250px', marginLeft: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',  }}>
                                    <p style={{ fontWeight: 'bold' }}>{props.noPosts}</p>
                                    <p style={{marginLeft: '0.25rem'}}>Posts</p>

                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,  }}>
                                    <p style={{ fontWeight: 'bold' }}>{props.user[0].followedby.length}</p>
                                    <p style={{marginLeft: '0.25rem'}}>Followers</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                    <p style={{ fontWeight: 'bold' }}>{props.user[0].isfollowing.length}</p>
                                    <p style={{marginLeft: '0.25rem'}}> Following</p>
                                </div>
                            </div>
                            <div style={{ marginLeft: '1rem' }}>
                                <EditProfile user={props.user[0]}></EditProfile>


                            </div>

                        </div>
                    </div>





                </div>




               
           
        )
    }

    return (
        <div style={{ height: '100px', width: '100%', zIndex: 10000,backgroundColor:'rgba(0, 0, 0, 0)' }}>

            {renderList()}
        </div>


    );
}


export default ProfileHeader