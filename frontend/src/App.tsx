import { useState } from "react";
import useDownload from "./hooks/useDownload";

export default function App() {
  const [url, setUrl] = useState<string>("");
  const [id, setId] = useState<string>("");

  const { downloading, downloaded, error, handle_download, reset } = useDownload({url, id});

  console.log(error);
  return (
    <main>
      <h1>Youtube Video Downloader</h1>
      <br />
      <div className="form">
        <input className="inp" value={url} type="text" placeholder="Copy the link here" 
          onChange={e => {
            setUrl(e.target.value);
            setId(e.target.value ? e.target.value.split("v=")[1].split("&")[0] : "")
        }} />
        <br />
        {!downloaded ? 
        <button className="button" onClick={() => handle_download()}>Download mp4</button>
        : <button className="button" onClick={() => {
          setUrl("");
          setId("");
          reset();
        }}>Reset</button>}
      </div>
      {downloaded && <div className="msg loaded">Downloaded ✔️ Check your /Downloads directory</div>}
      {downloading && <div className="msg loading">Downloading... ⌛</div>}
      {error && <div className="msg error">Failed to download ❌</div>}
    </main>
  );
}