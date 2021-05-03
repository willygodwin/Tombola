import React, {useState} from 'react'
import DragAndDrop from './DragAndDrop'

function FileList(props){
    const [files, setFiles] = useState([])

      const handleDrop = (filesinput) => {
        let fileList = files
        for (let i = 0; i < filesinput.length; i++) {
          if (!filesinput[i].name) return
          fileList.push(filesinput[i])
        }

        setFiles([...fileList])

        props.onDropped([...fileList])
      }

 

    console.log(files);
    return (

        
        <DragAndDrop handleDrop={handleDrop}>
        <div style={{height: 500, width: 250}}>
            Drop your images here:
            {files.map((file, i) =>
            <div key={i}>{file.name}</div>
            )}
        </div>
        </DragAndDrop>
    )
       
}

export default FileList;