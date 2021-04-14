import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UploadImage from "./components/uploadImage"

function App() {
    const [data, setData] = React.useState(null);

    const gifURL = "https://media.giphy.com/media/yjGdFXj16MHWtCh9aU/giphy.gif"

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={gifURL} className="meme-generator-gif" alt="logo" />
                <p>{!data ? "Loading..." : data}</p>
                <UploadImage/>
            </header>
        </div>
    );
}

export default App;