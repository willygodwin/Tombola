import React, { useEffect, useRef, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import GlobalStore from "../../utils/context/GlobalStore"; 
import './styles.css'
import { faAudioDescription } from "@fortawesome/free-solid-svg-icons";



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
        width: '100%',
        position: 'relative',
        fontSize: '0.75rem'

    },
})

const CssOutlinedInput = withStyles({
    root: {


        '&.MuiOutlinedInput-root': {

            '&.Mui-focused fieldset': {

                '&.MuiOutlinedInput-notchedOutline': {

                    borderColor: '#FF6701',
                }
            }
        }

    },
})(OutlinedInput);


function EditProfile(props) {
    const store = GlobalStore.useGlobalContext()
    const classes = useStyles();
    const [editing, setEditing] = useState(false)
    const [description, setDescription] = useState("")

    const handlePostBody = (event) => {
        setDescription(event.target.value)
    }

    const showInput = () => {
        setEditing(!editing)
    }



    const submitInput = () => {
        updateProfileDescription(description)
        .then((response) => {
            console.log(response);
            setEditing(false)
    
          });
    }

    
    const updateProfileDescription = (description) => {

        const payload = {
            profile_desc: description,

        }

        return fetch(`/api/profiledescription/${store.auth.authState.currentUser._id}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'

            },
        })
            .then((res) => res.json())



    }

    console.log(editing);

    const renderEdit = () => {
        if (!editing) {
            return (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent: "space-between", fontSize: '12px' }}>

                    {props.user.profile_desc}
                    {props.user._id === store.auth.authState.currentUser._id ? <FontAwesomeIcon className='EditButton' style={{ cursor: 'Pointer' }} onClick={showInput} icon={faEdit} size="md" />: <div></div> }
                    
                </div>

            )
        }
        else {
            return (
                <div style={{ position: 'relative' }}>
                    <CssOutlinedInput
                        onChange={handlePostBody}
                        className={classes.newPost}
                        placeholder="Description"
                        value={description}
                        multiline
                        rows={2}
                        rowsMax={2}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent: "space-between" }}>
                        <FontAwesomeIcon className='ExitButton' style={{ cursor: 'Pointer', position: 'absolute', top: '34px', right: '4px', fontSize:'0.8em' }} onClick={showInput} icon={faTimes} size="sm" />
                        <FontAwesomeIcon className='ExitButton' style={{ cursor: 'Pointer', position: 'absolute', top: '34px', right: '14px', fontSize: '0.7em' }} onClick={submitInput} icon={faCheck} size="xs" />
                    </div>
                </div>
            )
        }
    }


    return (
        <div>

            {renderEdit()}
        </div>
    )

}

export default EditProfile