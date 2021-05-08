import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FileList from '../upload/FileList'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";
import GlobalStore from "../../utils/context/GlobalStore";


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    postItem: {

    },
    newPost: {

        width: '100%'
    },
    numberInput: {
        width: '100%',
        marginRight: 0
    }
});

const CssOutlinedInput = withStyles({
    root: {
        //MuiInputBase-input
        //   '&.Mui-focused': {
        //   color:'#FF6701',

        '&.MuiOutlinedInput-root': {

            '&.Mui-focused fieldset': {

                '&.MuiOutlinedInput-notchedOutline': {

                    borderColor: '#FF6701',
                }
            }
        }

        //   borderBottom: '2px solid #FF6701',
        //   color:'#FF6701'



        //   },
    },
})(OutlinedInput);

function UserDetailsForm(props) {
    const history = useHistory()
    let { id } = useParams();
    const store = GlobalStore.useGlobalContext()

    //${store.auth.authState.currentUser._id}

    const classes = useStyles();
    axios.defaults.withCredentials = true;


    const [description, setDescription] = useState("")
    const [name, setName] = useState("")

    const [file, setFile] = useState([]);

    const handlePostBody = (event) => {
        setDescription(event.target.value)
    }

    const handlePostName = (event) => {
        setName(event.target.value)
    }

  




    const handleDrop = (filesDropped) => {
        setFile(filesDropped)
    }

    function createFormData(payload) {
        console.log(payload);
        const formData = new FormData();

        for (const key in payload) {

            const element = payload[key];
            console.log('start', element);

            if (element instanceof Array) {
                console.log(("if working"));

                element.forEach((ele, index) => {
                    console.log("for each working", ele);
                    formData.append(`${key}`, ele);
                })

            } else {
                console.log('else working', element);

                formData.append(key, element)
            }
        }
        return formData

    }
    const updateUser = (event) => {
        console.log(file);

        const payload = {
            id: store.auth.authState.currentUser._id,
            name,
            description,
            file,


        }

        const formData = createFormData(payload)

        console.log(formData);

        for (var value of formData.values()) {
            console.log('FormData: ', value);
        }

        event.preventDefault();

        fetch('/api/userdetails', {
            method: 'PATCH',
            // headers: {
            //     'Accept': 'application/json',
            // },
            body: formData,
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response);

                history.push("/wall");
                // const newPost = response.data.data;
                // props.setPosts([
                //     newPost,
                //     ...props.posts,
                // ])
            });
    }




    return (

        <Grid container justify="center">
            <Grid item xs={12} sm={12}>
                <form onSubmit={updateUser}>



                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '30px' }}>

                        <Typography variant="div" style={{ marginBottom: '5px', marginLeft: '2px', fontWeight: 'bold' }}>
                            Title:
                </Typography>
                        <CssOutlinedInput
                            onChange={handlePostName}
                            className={classes.newPost}
                            placeholder="Title"
                        />
                    </div>



        
                    <FileList onDropped={handleDrop} ></FileList>


                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px' }}>
                        <Typography variant="div" style={{ marginBottom: '5px', marginLeft: '2px', fontWeight: 'bold' }}>
                            Description:
                        </Typography>
                        <CssOutlinedInput
                            onChange={handlePostBody}
                            className={classes.newPost}
                            placeholder="Description"
                            multiline
                            rows={5}
                            rowsMax={10}
                        />
                    </div>

                    <Grid container justify="flex-end">
                        <Button color="primary" style={{ color: '#FF6701' }} onClick={updateUser}>
                            Post!
                        </Button>
                    </Grid>
                </form >


            </Grid>



        </Grid>




    )

}

export default UserDetailsForm