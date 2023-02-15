import { useState } from "react";
import useDownload from "./hooks/useDownload";

export default function App() {
  const [url, setUrl] = useState<string>("");
  const [id, setId] = useState<string>("");

  const { downloading, downloaded, error, handle_download } = useDownload({url, id});

  console.log(error);
  return (
    <main>
      <h1>Youtube Video Downloader</h1>
      <br />
      <input className="inp" type="text" placeholder="Copy the link here" 
        onChange={e => {
          setUrl(e.target.value);
          setId(e.target.value ? e.target.value.split("v=")[1].split("&")[0] : "")
      }} />
      <br />
      <button className="button" onClick={() => handle_download()}>Download</button>
      {downloaded && <>Downloaded</>}
      {downloading && <>Downloading...</>}
      {error && <>Error</>}
    </main>
  );
}