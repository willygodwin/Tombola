import React, {useEffect, useState, useRef, createRef} from 'react';
import './styles.css'

function DragAndDrop(props){

    const dropRef = createRef()
    let dragCounter = 0
    const [dragging, setDragging] = useState(false)

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounter++ 
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragging(true)
          }
    }
    const handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounter--
        if (dragCounter > 0) return
        setDragging(false)
    }
    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            console.log(e.dataTransfer.files);
            props.handleDrop(e.dataTransfer.files)
            e.dataTransfer.clearData()
            dragCounter = 0
        }
    }

  
    useEffect(() => {
        let div = dropRef.current
        
        div.addEventListener('dragenter', handleDragIn)
        div.addEventListener('dragleave', handleDragOut)
        div.addEventListener('dragover', handleDrag)
        div.addEventListener('drop', handleDrop)
        return () => {
            div.removeEventListener('dragenter', handleDragIn)
            div.removeEventListener('dragleave', handleDragOut)
            div.removeEventListener('dragover', handleDrag)
            div.removeEventListener('drop', handleDrop)
        }
    }, [])


    // text area
    return (
        <div  ref={dropRef} id="drop-area">
            <form className="my-form">
                <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
                <input type="file" id="fileElem" multiple accept="image/*" />
                <label className="button" for="fileElem">Select some files</label>
            </form>
        </div>
    );
}
export default DragAndDrop;