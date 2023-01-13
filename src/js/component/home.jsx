import React, {useState, useEffect, useRef} from "react";
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsSkipEndCircleFill, BsFillSkipEndCircleFill} from 'react-icons/bs';

//create your first component
const Home = () => {

	//declaracion de estados
	// espacio de memoria, la funcion que actualiza el valor inicial
	const [songs, setSongs]=useState([])//2. creamos un estado del array songs
	const [playing, setPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(0);
	const audioElem = useRef();

	// const [volume, setVolume] = useState(0.5);
	// const [keepPlaying, setKeepPlaying] = useState(false);
	// const [seguir, setSeguir] = useState(false);
  	// const [repeat, setRepeat] = useState(false);
	// const selectedSong = songs[index];
	// const urlSong = "https://assets.breatheco.de/apis/sound/" + selectedSong.url;

	useEffect(()=>{
		//codigo a ejecutar
		console.log("La pagina se ha cargado exitosamente");
		fetch('https://assets.breatheco.de/apis/sound/songs') //1.ir a buscar info en la url
		.then((response)=>response.json()) //2.Convierte la respuesta en un json
		// .then((data)=>console.log(data));
		.then((data)=>setSongs(data)) //3. Guarda el json en un objeto data
	},[])//cuando el array está vacio él va a cargar el codigo a ejecutar UNA vez cargada la página
	console.log(songs);

	useEffect(() => {
		if (playing) {
		  audioElem.current.play();
		}
		else {
		  audioElem.current.pause();
		}
	}, [playing])

	const onPlaying = () => {
		const duration = audioElem.current.duration;
		const ct = audioElem.current.currentTime;
		setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })
	}

	const Player = ({audioElem, playing, setPlaying, currentSong, setCurrentSong, songs})=> {
		const clickRef = useRef();
		const PlayPause = ()=>
		{
		  setPlaying(!playing);
		}
		


	function playSong(index) {
		// let selectedSong = songs[index];
		// const urlSong = "https://assets.breatheco.de/apis/sound/" + selectedSong.url;
		audioElem.current.src = urlSong;
		selectedCurrentSong(index);
		audioElem.current.play();
		setPlaying(true);

		if (repeat) {
			audioElem.current.onended = () => {
				playSong(index);
			};
		  } else {
			audioElem.current.onended = () => {
			  if (seguir) {
				let nextIndex = index + 1;
				if (nextIndex === canciones.length) {
					nextIndex = 0;
				}
				playSong(nextIndex);
			  }
			};
		  }
	}

	function pauseSong() {
		if (playing) {
		  audioElem.current.pause();
		  setPlaying(false);
		} else {
			contPlaying();
		}
	  }

	  function contPlaying() {
		audioElem.current.play();
		setPlaying(true);
	  }

	  function keepPlaying(index) {
		// let selectedSong = songs[index];
		// const urlTema = "https://assets.breatheco.de/apis/sound/" + selectedSong.url;
		audioElem.current.src = urlSong;
		selectedCurrentSong(index);
		audioElem.current.play();
		setKeepPlaying(true);
		seguir ? index++ : "";
		if (nextIndex === songs.length) {
		  nextIndex = 0;
		}
		seguir
		  ? (audioElem.current.onended = () => {
			  keepPlaying(index);
			})
		  : "";
	  }

	  function reanudarTema() {
		audioElem.current.play();
		setReproduciendo(true);
	  }
	function nextSong() {
		let nextIndex = currentSong+ 1;
		if(nextIndex === songs.length) {
			nextIndex = 0;
		}
		playSong(nextIndex);
	  }

	function prevSong() {
		let prevIndex = currentSong- 1;
		if(prevIndex < 0) {
			prevIndex = songs.length-1;
		}
		playSong(prevIndex);
	  }

	  return (
		
		<div className="bg-dark">
			<div className="App">
      			<audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} />
     			<Player songs={songs} setSongs={setSongs} isplaying={playing} setisplaying={setPlaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} />
    		</div>
			<div className="text-center sticky-top">
				<img src="https://www.beatmashmagazine.com/wp-content/uploads/2012/01/Music-Games.jpg" style={{widght: 1800}}></img></div>
				<ul>
				{canciones.map((item, index)=><div className="row"><button type="button" className="btn btn-outline-success col-6 mx-auto" onClick={()=>reprodicirTema(index)} key={item.id}>{item.name} </button></div>)}
				</ul>
				<div className="bg-success text-center sticky-bottom">
					<div className="text-center row">
						<audio ref={audioElem} className="bg-info"></ audio>
						<button type="button" className="btn btn-outline-dark col-1 mx-auto" onClick={retrocederTema}> Anterior </button>  
						<button type="button" className="btn btn-outline-dark col-1 mx-auto" onClick={pausarTema}> Pausar </button> 
						<button type="button" className="btn btn-outline-dark col-1 mx-auto" onClick={adelantarTema}> Siguiente </button> 
					</div>
				</div>
			</div>
	);
};

	

// 	const play = (index) => {
// 		setNumero(index);
// 		setPlaying(true);
// 		audioElem.current.play();
// 	}

// 	const pause = () => {
// 		setPlaying(false);
// 		audioElem.current.pause();
// 	}

// 	if (songs.length > 0 && numero >= 0 && numero < songs.length) {
// 		return (
// 			<>
// 				<div className="wrapper">
// 					<audio className="d-flex mx-auto"
// 						ref={audioElem} id="audioPlayer"
// 					/>
// 					<div className="container bg-dark text-white sticky-sm-bottom mx-auto" style={{width: "50rem"}}>
// 						<ol className="overflow-auto py-3">
// 							{songs.map((item, index) => (
// 								<li key={index} className={index === numero && playing ? "bg-secondary" : "white"}>
// 									<button className="btn text-white" onClick={() => play(index)}>{item.name}</button>
// 								</li>
// 							))}
// 						</ol>
// 						<div className="container mx-auto">
// 							<div className="fixed-bottom d-flex mx-auto bg-dark justify-content-center">
// 								<button className="btn btn-secondary" onClick={() => (numero == 0) ? setNumero(21) : setNumero(numero - 1)} >Anterior</button>
// 								<button className="btn btn-secondary mx-3" onClick={() => playing ? pause() : play(numero)}>{playing ? <i class="fa fa-pause"></i> : <i class="fa fa-play"></i>}</button>
// 								<button className="btn btn-secondary" onClick={() => (numero == 21) ? setNumero(0) : setNumero(numero + 1)}>Siguiente</button>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</>
// 		// <>
// 		// <div className="card mx-auto" style={{width: "30rem"}}>
//   		// 	{/* dibujamos la lista de canciones */}
//   		// 	<ol className="list-group list-group-flush">
// 		// 	{songs.map((item) =><li key={item.id} className="list-group-item">{item.name} -</li>)}
// 		// 	</ol>
// 		// </div>
// 		// </>
// 	);}
// 	return <div>Loading...</div>
// };

export default Home;
