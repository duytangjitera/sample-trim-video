import React, { useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import './App.css';

function App() {
  const [videoSrc, setVideoSrc] = useState('');
  const [message, setMessage] = useState('Click Start to transcode');
  const ffmpeg = createFFmpeg({
    log: true,
  });
  const doTranscode = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    setMessage('Start transcoding');
    ffmpeg.FS('writeFile', 'test.avi', await fetchFile('https://res.cloudinary.com/dfcktbv91/video/upload/v1677595056/w0fsbvt2gvnwyazxcutaubffzb2l.mov'));
    // await ffmpeg.run('-i', 'test.avi', 'test.mp4');
    await ffmpeg.run('-ss', '00:00:01', '-to', '00:00:10', '-i', 'test.avi', '-c', 'copy', 'test.mp4');
    setMessage('Complete transcoding');
    const data = ffmpeg.FS('readFile', 'test.mp4');
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
  };
  return (
    <div className="App">
      <p/>
      <video src={videoSrc} controls></video><br/>
      <button onClick={doTranscode}>Start</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
