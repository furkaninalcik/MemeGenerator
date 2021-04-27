
import React, { Component } from 'react';

class UploadImage extends Component {
    state = {
        selectedImage: null,
        image: null,
        memeURL: null
    };

    selectImage = (e) => {
        console.log("IMAGE SELECTED!!!")
        console.log(e.target.files[0])
        this.setState({
            selectedImage: e.target.files[0],
            image: URL.createObjectURL(e.target.files[0])
        })

    }
   
    render() {
        return (
            <div>
                <form action="/upload" method="post" enctype="multipart/form-data">
                    <input type="file" onChange={this.selectImage} name="baseImage" />
                    <input type="text" name="topText" placeholder = "Top Text" />
                    <input type="text" name="bottomText" placeholder="Bottom Text" />
                    <button>Submit</button>
                </form>
                <div>
                    <img src={this.state.selectedImage ? this.state.image: null} className="meme-generator-gif" alt="logo" />
                </div>

            </div>

        );
    }
}

export default UploadImage;