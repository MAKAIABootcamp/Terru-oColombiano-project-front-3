import { Button, Modal, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { BsFillHeartFill } from 'react-icons/bs'
import '../foro/foro.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createCommentAsync, ratePostAsync } from '../../redux/actions/placesActions';
import { Carousel } from 'react-responsive-carousel';
import Swal from 'sweetalert2';
const ModalMain = ({ place }) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rateShow, setRateShow] = useState('')
    const [rateValue, setRateValue] = useState(0);
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.users)
    console.log(user);
    const { places } = useSelector(store => store.places)
    const showModal = () => {
        setIsModalOpen(true);
    };
    console.log(place);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);


    };

    const handleRateChange = (value) => {
        setRateValue(value);
        dispatch(ratePostAsync(place.id, user, value))
        Swal.fire({
            icon: 'success',
            title: 'Gracias por calificar este lugar'
        })
        setRateShow('hidden')
    };
    const onSubmit = (data) => {

        dispatch(createCommentAsync(place.id, user, data))

        reset()
        setComments([...comments, { imgUser: user.photo, comment: data.comment, nameUser: user.name }])
    }
    useEffect(() => {
        setComments(place.comments)



    }, [place])


    const isRated = place.rate.find(e => e.idUser === user.id)






    return (
        <>
            <Button onClick={showModal} className='btnModal' >
                <FaRegCommentAlt /> Comentar

            </Button>
            <Modal title={`Publicación de ${place.postedBy}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }} className='mainModal'>
                <h3>{place.name}</h3>
                <Carousel
                    emulateTouch={true}
                    showArrows={true}
                    showStatus={false}
                    showIndicators={true}
                    showThumbs={false}
                    width={"100%"}
                    infiniteLoop={true}
                    className='carousel'>

                    {place.images.map((e, index) =>
                        <img src={e} alt="images" key={index} />

                    )}

                </Carousel>
                <p>{place.description}</p>
                <section className={`${rateShow} ${isRated ? 'hidden' : 'calification'} `}>
                    <h3>Califica este lugar</h3>
                    <Rate value={rateValue} onChange={handleRateChange} disabled={false} defaultValue={5} className='star' />
                </section>
                <div className='mainModal__comments'>
                    {comments.length ? comments.map((comment, index) =>
                        <figure key={index}>
                            <img src={comment.imgUser} alt="userComment" />
                            <figcaption>
                                <strong>{comment.nameUser}</strong>
                                <small>{comment.comment}</small>

                            </figcaption>
                        </figure>) : <h3>Aún no hay comentarios</h3>}
                </div>
                <form className='mainModal__add' onSubmit={handleSubmit(onSubmit)} >
                    <figure>
                        <img src={user.photo} alt="userComment" />
                        <input type="text" placeholder='Escribe un comentario...' {...register('comment')} />

                    </figure>
                </form>
            </Modal>
        </>
    );
};
export default ModalMain;