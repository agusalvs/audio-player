import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [songs, setSongs] = useState([]);
  const [volume, setVolume] = useState(0.5);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const audioRef = useRef(null);

  function playSong(index) {
    let selectedSong = songs[index];
    const urlTema =
      "https://assets.breatheco.de/apis/sound/" + selectedSong.url;
    audioRef.current.src = urlTema;
    setCurrentIndex(index);
    audioRef.current.play();
    setPlaying(true);

    if (repeat) {
      audioRef.current.onended = () => {
        playSong(index);
      };
    } else {
      audioRef.current.onended = () => {
        if (loop) {
          let nextIndex = index + 1;
          if (nextIndex === songs.length) {
            nextIndex = 0;
          }
          playSong(nextIndex);
        }
      };
    }
  }

  function pauseSong() {
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      continuePlaying();
    }
  }

  function loopPlaying(index) {
    let selectedSong = songs[index];
    const urlTema =
      "https://assets.breatheco.de/apis/sound/" + selectedSong.url;
    audioRef.current.src = urlTema;
    setCurrentIndex(index);
    audioRef.current.play();
    setPlaying(true);
    loop ? index++ : "";
    if (nextIndex === songs.length) {
      nextIndex = 0;
    }
    loop
      ? (audioRef.current.onended = () => {
          loopPlaying(index);
        })
      : "";
  }

  function continuePlaying() {
    audioRef.current.play();
    setPlaying(true);
  }

  function nextSong() {
    let nextIndex = currentIndex + 1;
    if (nextIndex === songs.length) {
      nextIndex = 0;
    }
    playSong(nextIndex);
  }

  function previousSong() {
    let previousIndex = currentIndex - 1;
    if (previousIndex < 0) {
      previousIndex = songs.length - 1;
    }
    playSong(previousIndex);
  }

  function playMusic() {
    const urlTema =
      "https://www.televisiontunes.com/uploads/audio/Pac%20Man%20-%20Techno%20Remix.mp3";
    audioRef.current.src = urlTema;
    setCurrentIndex(Math.floor(Math.random() * songs.length));
    audioRef.current.play();
    setPlaying(true);

    if (repeat) {
      audioRef.current.onended = () => {
        playSong(index);
      };
    } else {
      audioRef.current.onended = () => {
        if (loop) {
          let nextIndex = index + 1;
          if (nextIndex === songs.length) {
            nextIndex = 0;
          }
          playSong(nextIndex);
        }
      };
    }
  }

  function volUp() {
    let vol = volume + 0.1;
    if (vol > 1) {
      vol = 1;
    }
    setVolume(vol);
    audioRef.current.volume = vol;
  }

  function volDown() {
    let vol = volume - 0.1;
    if (vol < 0) {
      vol = 0;
    }
    setVolume(vol);
    audioRef.current.volume = vol;
  }

  function settingLoop() {
    loop ? setLoop(false) : setLoop(true);
  }

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/sound/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data));
  }, []);

  return (
    <>
      

    	<div className="bg-image pt-3"
	  		style={{backgroundImage: "url('https://img.freepik.com/premium-vector/cute-purple-aesthetic-abstract-minimal-background-perfect-wallpaper-backdrop-postcard-background_565280-448.jpg?w=2000')"}}>
				<nav className="navbar bg-image d-flex sticky-top">
        	<button type="button" className="btn btn-outline mx-auto" onClick={playMusic}>
          		<img src="https://www.pngimages.pics/images/quotes/english/general/transparent-music-notes-drawing-music-52650-218288.png" style={{height: "100", width: "180px"}}></img>
        	</button>
      </nav>
        <ul> {songs.map((item, index) => (
            <div className="row">
              <button type="button" className={`btn col-6 mx-auto ${
                  index === currentIndex ? "btn-dark" : "btn-outline-dark"
                }`} onClick={() => playSong(index)} key={item.id}>
                {item.name}{" "} </button>
            </div>
          	))}
        </ul>
        <div className="text-center sticky-bottom py-1 justify-content-center" style={{backgroundColor: "RGB(180, 146, 226)"}}>
          <div className="text-center row">
            	<audio ref={audioRef} className="bg-info"></audio>
				<div className="col-4">
            		<button type="button" className="btn mx-2" onClick={volDown}>
              			{" "}<img src="https://thenounproject.com/api/private/icons/425114/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABjxY8Oi7raM3Au6XLXc2vEAYSUlLtCfgrwiZRoMhhY0L6meRYenAlLEiGEW5fNifTSMoDf_NwzY8_0wdOR-uOU2g_CGA%3D%3D" style={{height: "60px", width: "60px"}}/>{" "}
            		</button>
            		<button type="button" className="btn mx-2" onClick={volUp}>
              			{" "}<img src="https://thenounproject.com/api/private/icons/425116/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABjxY8Oi7raM3Au6XLXc2vEAYSUlLtCfgrwiZRoMhhY0L6meRYenAlLEiGEW5fNifTSMoDf_NwzY8_0wdOR-uOU2g_CGA%3D%3D" style={{height: "60px", width: "60px"}}/>{" "}
            		</button>
				</div>
				<div className="col-4">
					<button type="button" className="btn mx-1" onClick={previousSong}>
              			{" "}<img src="https://thenounproject.com/api/private/icons/2665183/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABjxY8Oi7raM3Au6XLXc2vEAYSUlLtCfgrwiZRoMhhY0L6meRYenAlLEiGEW5fNifTSMoDf_NwzY8_0wdOR-uOU2g_CGA%3D%3D" style={{height: "60px", width: "60px"}}/>{" "}
					</button>
            		<button type="button" className="btn mx-1"
						onClick={playing ? pauseSong : continuePlaying}>
              	 		{playing ? <img src="https://thenounproject.com/api/private/icons/425202/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABjxY8Oi7raM3Au6XLXc2vEAYSUlLtCfgrwiZRoMhhY0L6meRYenAlLEiGEW5fNifTSMoDf_NwzY8_0wdOR-uOU2g_CGA%3D%3D" style={{height: "60px", width: "60px"}}/> : <img src="https://thenounproject.com/api/private/icons/425112/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABjxY8Oi7raM3Au6XLXc2vEAYSUlLtCfgrwiZRoMhhY0L6meRYenAlLEiGEW5fNifTSMoDf_NwzY8_0wdOR-uOU2g_CGA%3D%3D" style={{height: "70px", width: "70px"}}/>}
					</button>
            		<button  type="button" className="btn mx-1" onClick={nextSong}>
              			{" "}<img src="https://thenounproject.com/api/private/icons/2665182/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABjxY8Oi7raM3Au6XLXc2vEAYSUlLtCfgrwiZRoMhhY0L6meRYenAlLEiGEW5fNifTSMoDf_NwzY8_0wdOR-uOU2g_CGA%3D%3D" style={{height: "60px", width: "60px"}}/>{" "}
					</button>
				</div>
				<div className="col-4 justify-content-center">
            		<button type="button" className="btn mx-2" onClick={settingLoop}>
              			{loop ? "Playing" : <img src="https://thenounproject.com/api/private/icons/425107/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABjxY8Oi7raM3Au6XLXc2vEAYSUlLtCfgrwiZRoMhhY0L6meRYenAlLEiGEW5fNifTSMoDf_NwzY8_0wdOR-uOU2g_CGA%3D%3D" style={{height: "50px", width: "50px"}}/>}
         			</button>
              		<input type="checkbox" onChange={() => setRepeat(!repeat)}/><img src="https://thenounproject.com/api/private/icons/2665197/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABjxY8Oi7raM3Au6XLXc2vEAYSUlLtCfgrwiZRoMhhY0L6meRYenAlLEiGEW5fNifTSMoDf_NwzY8_0wdOR-uOU2g_CGA%3D%3D" style={{height: "50px", width: "50px"}}/>
				</div>
          	</div>
     	</div>
    </div>
    </>
  );
};

export default Home;