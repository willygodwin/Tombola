import React, {useEffect, useRef, useState} from "react";
import ModalNotification from './ModalNotification'
import { makeStyles, withStyles } from "@material-ui/core/styles";

function CurrentRaffles() {
    const [raffles, setRaffles] = useState([]);
    useEffect(() => {
       
        getCurrentRaffles()
        .then((response) => {
            console.log(response);
            
            setRaffles(response.data)
             
        });
    
    
      }, []);


    const getCurrentRaffles = () => {
        
    
        return fetch(`http://localhost:3001/api/currentraffles`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                
              },
        } )
        .then((res) => res.json())
        
    }

    return(
        <div>
            <ModalNotification ticket={raffles}></ModalNotification>

        </div>
    )


}

export default CurrentRaffles