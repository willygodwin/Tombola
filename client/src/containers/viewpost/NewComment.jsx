import React from 'react';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import { useState } from 'react';



function NewComment(props) {


    const [comment, setComment] = useState("")

    const handleChange = (event) => {
        setComment(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/comments', {
            post_id: props.post._id,
            body: comment
        }, { withCredentials: true }).then((response) => {


            props.addComment(response.data.data);



        })


    }



    return (
        <form onSubmit={onSubmit}>
            <TextField
                name="comment"
                onChange={handleChange} type="text" value={comment} label="Comment" />
        </form>
    )

}

export default NewComment