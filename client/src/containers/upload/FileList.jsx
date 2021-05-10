import React, { useState } from 'react'
import DragAndDrop from './DragAndDrop'

function FileList(props) {
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

  function displayUploadedImages(images) {
    if (images.length === 0) {
      return;
    }
    const displayedImages = images.map((img, index) => {
      const imgURL = URL.createObjectURL(img);
      return (
        <div >
          <img
            style={{ height: '200px', width: '200px' }}
            src={imgURL}
            onLoad={() => {
              console.log(`${imgURL} is being revoked`);
              URL.revokeObjectURL(imgURL);
            }}
          />
        </div>
      );
    });
    return displayedImages;
  }



  console.log(files);
  return (


    <DragAndDrop handleDrop={handleDrop}>
      <div style={{ height: 'auto', width: '100%', fontWeight: 'bold', marginBottom: '30px', marginLeft: '2px' }}>
        {props.label}
        {/* {files.map((file, i) =>
            <div key={i}>{file.name}</div>
            )} */}
        <div style={{ display: 'flex', flexDirection: 'row', flexFlow: 'wrap', justifyContent: 'space-evenly', }}>

          {displayUploadedImages(files)}
        </div>

      </div>
    </DragAndDrop>
  )

}

export default FileList;