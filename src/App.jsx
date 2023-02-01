import { useEffect, useRef } from "react";
export default function Home() {
  const videoRef = useRef(null);
  const photoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      });
  }, [videoRef]);

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;
    let context = photo.getContext("2d");
    context.drawImage(video, 0, 0, width, height);
  };
  return (
    <>
      <div className="app">
        <div className="">
          <video className="camera" ref={videoRef}></video>
        </div>

        <button onClick={() => takePhoto()}  style={{
          margin:"10px",padding:"5px"
        }}>Take photo</button>
        {photoRef && (
          <canvas className="image" ref={photoRef}></canvas>
        )}
      </div>
    </>
  );
}
