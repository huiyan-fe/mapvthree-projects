import {useState, useRef, useEffect} from 'react';
import {initScene} from './mapEngine/initScene.js';

import './App.css';

function App() {
    const ref = useRef();
    const center = [116.25241, 40.05298, 0];

    useEffect(() => {
        const config = {
            center,
            pitch: 65,
            zoom: 20,
            heading: -50
        };
        initScene(ref.current, config);
    }, [center]);

    return (
        <div className="App">
            <header className="App-header">
                <p>MapV Three 三维可视化</p>
            </header>
            <div className="container" ref={ref}></div>
        </div>
    );
}

export default App;
