import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import GlobalStore from "./../../../utils/context/GlobalStore"
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

  }));


function AppMaster(props) {
    const classes = useStyles();
    const store = GlobalStore.useGlobalContext()
    const history = useHistory()

    useEffect(() => {
        axios.get('http://localhost:3001/api/current-user', {
            withCredentials: true,
        })
            .then((response) => {
                store.auth.dispatchAuth({
                    type: 'set-user',
                    payload: response.data.data
                })
            }).catch((err) => {
                if(err.response.status === 401){
                    return history.push('/')
                }
                console.log({err});
            })
    }, [])

    return (
        <main {...props}>
            {/* <Navbar></Navbar> */}
            <Navbar2></Navbar2>
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={0} sm={3}>
                
                </Grid>
                <Grid item xs={12} sm={6}>
                    {props.children}
                </Grid>
                <Grid item xs={0} sm={3}>
                
                </Grid>
            </Grid>
      
            </div>
        </main>
    );
}

export default AppMaster;
