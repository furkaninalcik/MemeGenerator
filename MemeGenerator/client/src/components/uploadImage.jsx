
import React, { Component } from 'react';
import axios from 'axios'

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

    uploadSelectedImage = (e) => {

        //axios.get("https://api.memegen.link/images/custom/_/my_background.png?background=http://www.gstatic.com/webp/gallery/1.png")
        //    .then(res => {
        //        console.log(res)
        //
        //        this.setState({
        //            memeURL: 'https://api.memegen.link/images/custom/_/my_background.png?background=${this.state.image}'
        //        })
        //
        //    })

        //axios.post("/upload", {
        //    imageData: this.state.selectedImage
        //    })
        //    .then(function (response) {
        //        console.log(response);
        //    })
        //    .catch(function (error) {
        //        console.log(error);
        //    }
        //)



    }

    render() {
        return (
            <div>
                <form action="/upload" method="post" enctype="multipart/form-data">
                    <input type="file" name="baseImage" />
                    <input type="text" name="topText" placeholder = "Top Text" />
                    <input type="text" name="buttomText" placeholder="Buttom Text" />
                    <button>Submit</button>
                </form>


            </div>

        );
    }
}

export default UploadImage;