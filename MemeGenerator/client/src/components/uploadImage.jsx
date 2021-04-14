
import React, { Component } from 'react';
import axios from 'axios'

class UploadImage extends Component {
    state = {
        selectedImage: null,
        image: null
    };

    selectImage = (e) => {
        console.log("IMAGE SELECTED!!!")
        console.log(e.target.files[0])
        this.setState({
            selectedImage: e.target.files[0],
            image: URL.createObjectURL(e.target.files[0])
        })

    }

    uploadSelectedImage = (e) => {



    }

    render() {
        return (
            <div>
                <input onChange={this.selectImage} type="file" id="file-input" name="ImageStyle" className="meme-upload" />
                <button onClick={this.uploadSelectedImage}>Upload Image</button>
                <p>{this.state.selectedImage && this.state.selectedImage.name}</p>
                <img src={this.state.selectedImage && this.state.image} className="meme-generator-gif" alt="" />
            </div>

        );
    }
}

export default UploadImage;