import React, { useEffect, useState, createRef } from 'react';


function DragAndDrop(props) {

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
        <div ref={dropRef} style={{ display: 'flex', flexDirection: 'row', overflowY: 'auto', width: '100%', justifyContent: 'space-between', minHeight: '200px', position: 'relative' }}>
            {dragging &&
                <div
                    style={{
                        border: 'dashed grey 4px',
                        backgroundColor: 'rgba(255,255,255,.8)',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            left: 0,
                            textAlign: 'center',
                            color: 'grey',
                            fontSize: 36
                        }}
                    >
                        <div>drop here :)</div>
                    </div>
                </div>
            }
            {props.children}
        </div>
    );
}
export default DragAndDrop;