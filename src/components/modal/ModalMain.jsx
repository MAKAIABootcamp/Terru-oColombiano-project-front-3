import { Button, Modal } from 'antd';
import { useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { BsFillHeartFill } from 'react-icons/bs'
import '../foro/foro.scss'
import { useSelector } from 'react-redux';
const ModalMain = ({ place }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const { user } = useSelector(store => store.users)
    return (
        <>
            <Button onClick={showModal} className='btnModal' >
                <FaRegCommentAlt /> Comentar

            </Button>
            <Modal title={`Publicación de ${place.postedBy}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='mainModal'>
                <h3>{place.name}</h3>
                <figure>
                    <img src={place.imgPlace} alt="postImg" />
                </figure>
                <p>{place.description}</p>
                <section>
                    <button><BsFillHeartFill /> Agregar a favoritos</button>
                    <button><FaRegCommentAlt />Comentar</button>
                </section>
                <div className='mainModal__comments'>
                    <figure>
                        <img src="" alt="userComment" />
                        <figcaption>
                            <strong>Wilinton Ascanio</strong>
                            <small>Este es el comentario</small>

                        </figcaption>
                    </figure>
                    <figure>
                        <img src="" alt="userComment" />
                        <figcaption>
                            <strong>Wilinton Ascanio</strong>
                            <small>Este es el comentario</small>

                        </figcaption>
                    </figure>
                    <figure>
                        <img src="" alt="userComment" />
                        <figcaption>
                            <strong>Wilinton Ascanio</strong>
                            <small>Este es el comentario</small>

                        </figcaption>
                    </figure>
                    <figure>
                        <img src="" alt="userComment" />
                        <figcaption>
                            <strong>Wilinton Ascanio</strong>
                            <small>Este es el comentario</small>

                        </figcaption>
                    </figure>
                </div>
                <div className='mainModal__add'>
                    <figure>
                        <img src={user.photo} alt="userComment" />
                        <input type="text" placeholder='Escribe un comentario...' />

                    </figure>
                </div>
            </Modal>
        </>
    );
};
export default ModalMain;