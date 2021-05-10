import React from 'react';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import { useState } from 'react';



function NewComment(props) {


    const [comment, setComment] = useState("")

    const handleChange = (event) => {
        event.preventDefault();
        event.stopPropagation()
        setComment(event.target.value);
    }

    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation()
    }

    const onSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation()
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
                onClick={handleClick} onChange={handleChange} type="text" value={comment} label="Comment" />
        </form>
    )

}

export default NewComment