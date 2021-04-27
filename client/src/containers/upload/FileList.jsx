import React, { useEffect, useState, useRef, createRef } from 'react'
import DragAndDrop from './DragAndDrop'

function FileList(props){
    const [files, setFiles] = useState([])

      const handleDrop = (filesinput) => {
        let fileList = files
        for (let i = 0; i < filesinput.length; i++) {
          if (!filesinput[i].name) return
          fileList.push(filesinput[i].name)
        }
        setFiles([...fileList])
      }

    console.log(files);
    return (
        <DragAndDrop handleDrop={handleDrop}>
        <div style={{height: 300, width: 250}}>
            {files.map((file, i) =>
            <div key={i}>{file}</div>
            )}
        </div>
        </DragAndDrop>
    )
       
}

export default FileList;