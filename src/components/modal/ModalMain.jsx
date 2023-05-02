import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { BsFillHeartFill } from 'react-icons/bs'
import '../foro/foro.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createCommentAsync } from '../../redux/actions/placesActions';
const ModalMain = ({ place }) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.users)
    const { places} = useSelector(store => store.places)
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);


    };
    const onSubmit = (data) => {
        dispatch(createCommentAsync(place.id, user, data))

        reset()
        setComments([...comments, {imgUser: user.photo, comment : data.comment, nameUser : user.name}])
    }
    useEffect(() => {
        setComments(place.comments)
        


    }, [place])


    


    return (
        <>
            <Button onClick={showModal} className='btnModal' >
                <FaRegCommentAlt /> Comentar

            </Button>
            <Modal title={`Publicación de ${place.postedBy}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='mainModal'>
                <h3>{place.name}</h3>
                <figure>
                    <img src={place.images[0]} alt="postImg" />
                </figure>
                <p>{place.description}</p>
                {/* <section>
                    <button><BsFillHeartFill /> Agregar a favoritos</button>
                    <button><FaRegCommentAlt />Comentar</button>
                </section> */}
                <div className='mainModal__comments'>
                    {comments.length ? comments.map((comment, index) =>
                        <figure key={index}>
                            <img src={comment.imgUser} alt="userComment" />
                            <figcaption>
                                <strong>{comment.nameUser}</strong>
                                <small>{comment.comment}</small>

                            </figcaption>
                        </figure>) : <h1>Aún no hay comentarios</h1>}
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