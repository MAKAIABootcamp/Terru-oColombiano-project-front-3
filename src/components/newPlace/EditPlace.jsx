import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { fileUpLoad } from '../../services/fileUpLoad';
import MapContainer from '../Map/MapContainer';
import { BsFillCarFrontFill } from 'react-icons/bs';
import { FaBus } from 'react-icons/fa';
import { RiMotorbikeFill, RiShipLine } from 'react-icons/ri';
import { IoMdBicycle } from 'react-icons/io';
import { BiWalk } from 'react-icons/bi';
import './newPlace.scss'
import UploadImages from '../uploadImages/UploadImages';

const EditPlace = () => {
    const [images, setImages] = useState([]);
    const [transports, setTransports] = useState([]);
    const [activity, setActivity] = useState([]);
    const [location, setLocation] = useState(null);
    const { places } = useSelector(store => store.places)
    const { idPlace } = useParams()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { user } = useSelector((store) => store.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLocationSelected = (location) => {
        setLocation(location);
    }



    useEffect(() => {
        console.log(images);
    }, [images]);


    const addTransport = (name) => {
        if (transports.includes(name)) {
            setTransports(transports.filter((t) => t !== name));
        } else {
            setTransports([...transports, name]);
        }
    };

    const addActivity = (name) => {
        if (activity.includes(name)) {
            setActivity(activity.filter((a) => a !== name));
        } else {
            setActivity([...activity, name]);
        }
    };

    const handleLoad = (file) => {
        setImages([...images, file]);
    };

    const uploadImagesToClaoudinary = async (arrayImages) => {
        const arrayUrlImages = [];

        if (arrayImages.length < 3) {
            Swal.fire({
                icon: 'info',
                text: 'Por favor agregar mínimo 3 fotos'
            })
            return [];
        }
        if (!location) {
            Swal.fire({
                icon: 'info',
                text: 'Por favor agrega un ubicación'
            })
            return [];

        }

        for (const file of arrayImages) {
            console.log(file);
            const urlImages = await fileUpLoad(file);
            arrayUrlImages.push(urlImages);
        }
        console.log(arrayImages);
        return arrayUrlImages;
    };
    const placeDetails = places?.find(item => item.id === idPlace)

    useEffect(() => {
        setTransports(placeDetails.icons)
        setActivity(placeDetails.category) 
        setImages(placeDetails.images) 
      



    }, [])

    console.log(placeDetails);


    console.log(placeDetails);

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <article className='editPlace'>
            <div className="addPlace__photos">
                <small><strong>Imágenes del lugar</strong>(Min. 3)</small>
                <UploadImages onLoad={handleLoad} />

            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
            >

                <label>
                    Nombre
                    <input
                        type="text"
                        placeholder={placeDetails.name}
                        {...register("name")}
                    />
                </label>
                <label>
                    Descripción del lugar
                    <textarea
                        cols="10"
                        rows="5"
                        placeholder={placeDetails.description}
                        {...register("description")}
                    ></textarea>
                </label>
                <MapContainer apiKey='AIzaSyD77vfAu1kBoFFgavfDxBjkkj9xEx24E10' onLocationSelected={handleLocationSelected} />
                <label>
                    Actividades
                    <textarea
                        cols="10"
                        rows="5"
                        placeholder={placeDetails.activities}
                        {...register("activities")}
                    ></textarea>
                </label>
                {errors.activities ? <span>{errors.activities.message}</span> : <></>}
                <label>
                    Por favor seleccione la categoría de cada actividad
                    <section>
                        <small
                            className={activity.includes("Natación") ? "selected" : ""}
                            onClick={() => addActivity("Natación")}
                        >
                            Natación
                        </small>
                        <small
                            className={activity.includes("Mirador") ? "selected" : ""}
                            onClick={() => addActivity("Mirador")}
                        >
                            Mirador
                        </small>
                        <small
                            className={activity.includes("Ciclismo") ? "selected" : ""}
                            onClick={() => addActivity("Ciclismo")}
                        >
                            Ciclismo
                        </small>
                        <small
                            className={activity.includes("Camping") ? "selected" : ""}
                            onClick={() => addActivity("Camping")}
                        >
                            Camping
                        </small>
                        <small
                            className={activity.includes("Restaurantes") ? "selected" : ""}
                            onClick={() => addActivity("Restaurantes")}
                        >
                            Restaurantes
                        </small>
                        <small
                            className={activity.includes("Senderismo") ? "selected" : ""}
                            onClick={() => addActivity("Senderismo")}
                        >
                            Senderismo
                        </small>
                        <small
                            className={activity.includes("Cultura") ? "selected" : ""}
                            onClick={() => addActivity("Cultura")}
                        >
                            Cultura
                        </small>
                        <small
                            className={activity.includes("Atracciones") ? "selected" : ""}
                            onClick={() => addActivity("Atracciones")}
                        >
                            Atracciones
                        </small>
                    </section>
                </label>

                <label>
                    Horarios de atención
                    <input
                        type="text"
                        placeholder={placeDetails.schedules}
                        {...register("schedules")}
                    />
                </label>
                {errors.schedules ? <span>{errors.schedules.message}</span> : <></>}

                <label>
                    Que tipo de clima hay en el lugar?
                    <select
                        {...register("weather")}
                    >
                        <option value="">{placeDetails.weather === 1 ? 'Seco' : placeDetails.weather === 2 ? 'Templado' : placeDetails.weather === 3 ? 'De montaña' : 'Tropical húmedo'}</option>
                        <option value="1">Seco</option>
                        <option value="2">Templado</option>
                        <option value="3">De montaña</option>
                        <option value="4">Tropical húmedo</option>
                    </select>
                </label>
                {errors.weather ? <span>{errors.weather.message}</span> : <></>}
                <label>
                    Cómo llegar ?
                    <textarea
                        cols="10"
                        rows="5"
                        placeholder={placeDetails.tranport}
                        {...register("transport")}
                    ></textarea>
                </label>
                <label>
                    Medios de transporte para llegar
                    <section>
                        <small
                            className={transports.includes("car") ? "selected" : ""}
                            onClick={() => addTransport("car")}
                        >
                            <BsFillCarFrontFill /> Carro
                        </small>
                        <small
                            className={transports.includes("bus") ? "selected" : ""}
                            onClick={() => addTransport("bus")}
                        >
                            <FaBus /> Bus
                        </small>
                        <small
                            className={transports.includes("moto") ? "selected" : ""}
                            onClick={() => addTransport("moto")}
                        >
                            <RiMotorbikeFill /> Motocicleta
                        </small>
                        <small
                            className={transports.includes("bici") ? "selected" : ""}
                            onClick={() => addTransport("bici")}
                        >
                            <IoMdBicycle /> Bicicleta
                        </small>
                        <small
                            className={transports.includes("walking") ? "selected" : ""}
                            onClick={() => addTransport("walking")}
                        >
                            <BiWalk /> Caminando
                        </small>
                        <small
                            className={transports.includes("ship") ? "selected" : ""}
                            onClick={() => addTransport("ship")}
                        >
                            {" "}
                            <RiShipLine /> Lancha / Bote
                        </small>
                    </section>
                </label>

                <button type="submit">Editar lugar</button>
            </form>

        </article>
    )
}

export default EditPlace