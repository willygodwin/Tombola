import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FileList from './FileList'
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";



const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    postItem: {
        marginTop: 30,
        marginBottom: 30,
    },
    newPost: {
        marginTop: 30,
        marginBottom: 30,
        width: 400
    },
});

function NewPost(props){

    const classes = useStyles();
    axios.defaults.withCredentials = true;

    
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    

    const [files, setFiles] = useState([]);

    const handlePostBody = (event) => {
        setDescription(event.target.value)
    }

    const handlePostTitle = (event) => {
        setTitle(event.target.value)
    }

    function createFormData(payload) {
        console.log(payload);
        const formData = new FormData();

        for (const key in payload) {
            
            const element = payload[key];
            console.log('start', element);

            if(element instanceof Array){
                console.log(("if working"));

                element.forEach((ele, index) => {
                    console.log("for each working", ele);
                    formData.append(`${key}[${index}]`, ele);
                })

            }else{
                console.log('else working', element);

                formData.append(key, element)
            }
        }
        return formData
        
    }
    const createPost = (event) => {
        console.log(files);

        const payload =  {
            title,
            description,
            files,
        }

        const formData = createFormData(payload)

        console.log(formData);
      
        for (var value of formData.values()) {
            console.log('FormData: ', value);
         }

        event.preventDefault();

        fetch('http://localhost:3001/api/posts', {
            method: 'POST',
            // headers: {
            //     'Accept': 'application/json',
            // },
            body: formData,
            credentials: 'include',
        } )
        .then((res) => res.json())
        .then((response) => {
            console.log(response);
            // const newPost = response.data.data;
            // props.setPosts([
            //     newPost,
            //     ...props.posts,
            // ])
        });
    }

    const handleDrop = (filesDropped) => {
        setFiles(filesDropped)
    }

    return (
        <>
        <Grid container justify="center">
            <Typography variant="h5">
                Upload a new Tombola
            </Typography>
        </Grid>

        <Grid container justify="center">
            <OutlinedInput
                onChange={handlePostTitle}
                className={classes.newPost}
                placeholder="Title"
            />
        </Grid>

        <Grid container justify="center">
        <FileList onDropped={handleDrop} ></FileList>
        
            <form onSubmit={createPost}>
                <OutlinedInput
                    onChange={handlePostBody}
                    className={classes.newPost}
                    placeholder="Description"
                    multiline
                    rows={5}
                    rowsMax={10}
                />
                
                <Grid container justify="flex-end">
                    <Button color="primary" onClick={createPost}>
                        Post!
                    </Button>
                </Grid>
            </form >
        </Grid>
        </>
    )

}

export default NewPost