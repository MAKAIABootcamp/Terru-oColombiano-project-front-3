import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fileUpLoad } from '../../services/fileUpLoad'
import { createPostAsync } from '../../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'
import { BsFillCarFrontFill } from 'react-icons/bs'
import { RiMotorbikeFill } from 'react-icons/ri'
import { BiWalk } from 'react-icons/bi'
import { FaBus } from 'react-icons/fa'
import { IoMdBicycle } from 'react-icons/io'
import { RiShipLine } from 'react-icons/ri'
import nextId from "react-id-generator";
import UploadImages from '../uploadImages/UploadImages'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


const AddPlace = () => {
    const [transports, setTransports] = useState([])
    const [urlImgs, setUrlImgs] = useState([])
    const [activity, setActivity] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        // {
        //   uid: '-1',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //   uid: '-2',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //   uid: '-3',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //   uid: '-4',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //   uid: '-xxx',
        //   percent: 50,
        //   name: 'image.png',
        //   status: 'uploading',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //   uid: '-5',
        //   name: 'image.png',
        //   status: 'error',
        // },
    ]);

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { user } = useSelector(store => store.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const addTransport = (name) => {
        if (transports.includes(name)) {
            setTransports(transports.filter(t => t !== name))


        } else {
            setTransports([...transports, name])
        }


    }

    const addActivity = (name) => {
        if (activity.includes(name)) {
            setActivity(activity.filter(a => a !== name))


        } else {
            setActivity([...activity, name])
        }


    }
    const appUrlImages = (url) => {
        setUrlImgs([...urlImgs, url])

    }











    const onSubmit = async (data) => {
        // const imgPlace = data.imgPlace[0] ? await fileUpLoad(data.imgPlace[0]) : '';
        // const imgAct = data.imgAct[0] ? await fileUpLoad(data.imgAct[0]) : '';
        // const imgPlace2 = data.imgPlace2[0] ? await fileUpLoad(data.imgPlace2[0]) : '';




        const newPlace = {
            name: data.name,
            description: data.description,
            location: data.location,
            department: data.department,
            activities: data.activities,
            category: activity,
            schedules: data.schedules,
            weather: data.weather,
            tranport: data.transport,
            icons: transports,
            images: [...fileList],
            postedBy: user.name,
            postedByImg: user.photo,
            rate: 0,
            comments: [],
            status : 'Pendiente'




        }
        console.log(newPlace);

        dispatch(createPostAsync(newPlace))
        toast('✔ Publicación exitosa!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });




    }

    return (
        <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}>
            <h1>Agregar nuevo lugar</h1>

            <label>
                Nombre
                <input type="text" placeholder='Nombre del lugar' {...register('name', {
                    required: 'Este campo es requerido'
                })} />
            </label>
            {errors.name ? <span>{errors.name.message}</span> : <></>}
            <label>
                Descripción del lugar
                <textarea cols="10" rows="5" placeholder='Descripción detallada del lugar' {...register('description', {
                    required: 'Este campo es requerido'
                })}></textarea>
            </label>
            {errors.description ? <span>{errors.description.message}</span> : <></>}
            <label>
                Ciudad o Pueblo
                <input type="text" placeholder='Ubicación del lugar' {...register('location', {
                    required: 'Este campo es requerido'
                })} />
            </label>
            {errors.location ? <span>{errors.location.message}</span> : <></>}
            <label>
                Departamento
                <input type="text" placeholder='Departamento en el que se encuentra' {...register('department', {
                    required: 'Este campo es requerido'
                })} />
            </label>
            {errors.department ? <span>{errors.department.message}</span> : <></>}
            <label>
                Actividades
                <textarea cols="10" rows="5" placeholder='Descripción de las actividades que se pueden realizar' {...register('activities', {
                    required: 'Este campo es requerido'
                })}></textarea>
            </label>
            {errors.activities ? <span>{errors.activities.message}</span> : <></>}
            <label>
                Por favor seleccione la categoría de cada actividad

                <section>
                    <small className={activity.includes('Natación') ? 'selected' : ''} onClick={() => addActivity('Natación')}>Natación</small>
                    <small className={activity.includes('Mirador') ? 'selected' : ''} onClick={() => addActivity('Mirador')}>Mirador</small>
                    <small className={activity.includes('Ciclismo') ? 'selected' : ''} onClick={() => addActivity('Ciclismo')}>Ciclismo</small>
                    <small className={activity.includes('Camping') ? 'selected' : ''} onClick={() => addActivity('Camping')}>Camping</small>
                    <small className={activity.includes('Restaurantes') ? 'selected' : ''} onClick={() => addActivity('Restaurantes')}>Restaurantes</small>
                    <small className={activity.includes('Senderismo') ? 'selected' : ''} onClick={() => addActivity('Senderismo')}>Senderismo</small>
                    <small className={activity.includes('Cultura') ? 'selected' : ''} onClick={() => addActivity('Cultura')}>Cultura</small>
                    <small className={activity.includes('Atracciones') ? 'selected' : ''} onClick={() => addActivity('Atracciones')}>Atracciones</small>
                </section>

            </label>

            <label>
                Horarios de atención
                <input type="text" placeholder='Ingrese el horario de atención' {...register('schedules', {
                    required: 'Este campo es requerido'
                })} />
            </label>
            {errors.schedules ? <span>{errors.schedules.message}</span> : <></>}

            <label>
                Que tipo de clima hay en el lugar?
                <select {...register('weather', {
                    required: 'Este campo es requerido'
                })}>
                    <option value="">Seleccione</option>
                    <option value="1">Seco</option>
                    <option value="2">Templado</option>
                    <option value="3">De montaña</option>
                    <option value="4">Tropical húmedo</option>
                </select>
            </label>
            {errors.weather ? <span>{errors.weather.message}</span> : <></>}
            <label>
                Cómo llegar ?
                <textarea cols="10" rows="5" placeholder='Descripción de como llegar al lugar' {...register('transport', {
                    required: 'Este campo es requerido'
                })}></textarea>
            </label>
            <label>
                {/* <BsFillCarFrontFill />
        <RiMotorbikeFill />
        <BiWalk />
        <FaBus />
        <IoMdBicycle />
        <RiShipLine /> */}
                Medios de transporte para llegar
                <section>
                    <small className={transports.includes('car') ? 'selected' : ''} onClick={() => addTransport('car')}><BsFillCarFrontFill /> Carro</small>
                    <small className={transports.includes('bus') ? 'selected' : ''} onClick={() => addTransport('bus')}><FaBus /> Bus</small>
                    <small className={transports.includes('moto') ? 'selected' : ''} onClick={() => addTransport('moto')}><RiMotorbikeFill /> Motocilceta</small>
                    <small className={transports.includes('bici') ? 'selected' : ''} onClick={() => addTransport('bici')}><IoMdBicycle /> Bicicleta</small>
                    <small className={transports.includes('walking') ? 'selected' : ''} onClick={() => addTransport('walking')}><BiWalk /> Caminando</small>
                    <small className={transports.includes('ship') ? 'selected' : ''} onClick={() => addTransport('ship')}> <RiShipLine /> Lancha / Bote</small>
                </section>
            </label>
            <label>
                Imágenes que nos permitan ver el lugar

                <>
                    {/* <Upload
                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={(file) => {
                            fileUpLoad(file);
                            return false;
                        }}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal> */}
                </>
                <UploadImages />

                {/* <input type="file" {...register('imgPlace', {
                    required: 'Este campo es requerido'
                })} />
                {errors.imgPlace ? <span>{errors.imgPlace.message}</span> : <></>}
                <input type="file" {...register('imgAct', {
                    required: 'Este campo es requerido'
                })} />
                {errors.imgAct ? <span>{errors.imgAct.message}</span> : <></>}
                <input type="file" {...register('imgPlace2', {
                    required: 'Este campo es requerido'
                })} />
                {errors.imgPlace2 ? <span>{errors.imgPlace2.message}</span> : <></>} */}
            </label>



            <button type='submit'>Agregar lugar</button>

        </motion.form>
    )
}

export default AddPlace