import React, { useState } from 'react';
import defaultImage from "../assets/Upload-image-default.png"
import axios from 'axios';


const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(defaultImage);
  const [uploadStatus, setUploadStatus] = useState('');
  const imageSource = selectedFile && typeof selectedFile !== 'string' ? URL.createObjectURL(selectedFile) : selectedFile;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8080/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);

      if(error.response.status === 406) { 
        setUploadStatus('Error uploading image, file not supported')
      }
      else {
        setUploadStatus('Error uploading image' + error.response.status);
      }
    }
  };

  return (
    <div>
      <h2>Image Uploader</h2>
      <div >
            <img src={imageSource} style={{maxWidth: '100%', maxHeight: '100%', width: '400px', height: '250px', objectFit: 'contain'}}/>
      </div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default ImageUploader;
