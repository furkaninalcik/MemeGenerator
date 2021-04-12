import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src="https://media.giphy.com/media/yjGdFXj16MHWtCh9aU/giphy.gif" className="meme-generator-gif" alt="logo" />
                <p>{!data ? "Loading..." : data}</p>
                <input type="file" id="file-input" name="ImageStyle" className="meme-upload" />
            </header>
        </div>
    );
}

export default App;