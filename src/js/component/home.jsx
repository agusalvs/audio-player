import React, {useState, useEffect, useRef} from "react";

//create your first component
const Home = () => {

	//declaracion de estados
	// espacio de memoria, la funcion que actualiza el valor inicial
	const [numero, setnumero] = useState(0);
	const[songs, setSongs]=useState([])//2. creamos un estado del array songs
	const [playing, setPlaying] = useState(false);
	const audioRef = useRef(null);

	// useEffect(()=>{
	// 	//codigo a ejecutar
	// 	console.log("Haz aumentado el numero de seguidor");
	// },[counter])//cuando el array está lleno el efecto va a cargar el codigo a ejecutar VARIAS VECES

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
		if (audioRef.current) {
			audioRef.current.src = 'https://assets.breatheco.de/apis/sound/' + songs[numero].url;
			audioRef.current.play();
		}
	}, [numero]);

	const play = (index) => {
		setnumero(index);
		setPlaying(true);
		audioRef.current.play();
	}

	const pause = () => {
		setPlaying(false);
		audioRef.current.pause();
	}

	if (songs.length > 0 && numero >= 0 && numero < songs.length) {
return (
	<>
				<div className="wrapper">
					<audio className="d-flex ms-auto me-auto mb-2"
						ref={audioRef} id="audioPlayer"
					/>
					<div className="container bg-dark text-white sticky-sm-bottom">
						<ol className="overflow-auto">
							{songs.map((item, index) => (
								<li key={index} className={index === numero && playing ? "bg-secondary" : "white"}>
									<button className="btn text-white" onClick={() => play(index)}>{item.name}</button>
								</li>
							))}
						</ol>
						<div className="container pb-2">
							<div className="fixed-bottom d-flex mx-auto bg-dark justify-content-center">
								<button className="btn btn-secondary" onClick={() => (numero == 0) ? setnumero(21) : setnumero(numero - 1)} >Anterior</button>
								<button className="btn btn-secondary mx-3" onClick={() => playing ? pause() : play(numero)}>{playing ? <i class="fa fa-pause"></i> : <i class="fa fa-play"></i>}</button>
								<button className="btn btn-secondary" onClick={() => (numero == 21) ? setnumero(0) : setnumero(numero + 1)}>Siguiente</button>
							</div>
						</div>
					</div>
				</div>
			</>
		// <>
		// <div className="card mx-auto" style={{width: "30rem"}}>
  		// 	{/* dibujamos la lista de canciones */}
  		// 	<ol className="list-group list-group-flush">
		// 	{songs.map((item)=><li key={item.id} className="list-group-item">{item.name} -</li>)}
		// 	</ol>
		// </div>
		// </>
	);}
	return <div>Loading...</div>
};

export default Home;
