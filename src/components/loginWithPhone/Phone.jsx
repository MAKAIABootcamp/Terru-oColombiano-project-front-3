import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

import { BsFillTelephoneFill } from 'react-icons/bs'
import Swal from 'sweetalert2';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

const Phone = () => {
    const { handleSubmit, formState: { errors }, register } = useForm();
    const navigate = useNavigate()

    const generateRecaptcha = () => {
        try {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptch-container', {
                'size': 'invisible',
                'callback': () => {

                }
            }, auth)

        } catch (error) {
            console.log(error);

        }
    }
    const sendSMS = (ind, number, recaptchaVerifier) => {
        signInWithPhoneNumber(auth, `${ind}${number}`, recaptchaVerifier)
            .then((response) => {
                window.confirmationResult = response
                console.log(window.confirmationResult)
                
                Swal.fire({
                    icon: 'success',
                    title: 'Perfecto',
                    text: 'En unos instantes te llegará un código de verificación'
                }).then(() => {
                    navigate('/loginWithPhone/verification')

                })

            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lo sentimos',
                    text: `Ha ocurrido un error ${error.message}`
                })

            })

    }
    const onSubmit = (data) => {
        console.log(data.phone);
        generateRecaptcha()
        const appVerifier = window.recaptchaVerifier;
        sendSMS(`+ ${data.indicative}`, data.phone, appVerifier)
        console.log(appVerifier);

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='loginWithPhone__number'>
            
            <h4>Iniciar sesión</h4>
            <p>Inicie sesión o cree una cuenta con su número de teléfono</p>
            <label>
                <section>
                    <BsFillTelephoneFill className='phone' />
                    <small>+<input type="text" placeholder='57' {...register('indicative', {
                        required: 'El indicativo es requerido'
                    })} /></small>

                    <input type="text" placeholder='Celular' {...register('phone', {
                        required :'El número es requerido'
                    })} />

                </section>
                {errors.indicative ? <span>{errors.indicative.message}</span> : <></>}
                {errors.phone ? <span>{errors.phone.message}</span> : <></>}
            </label>
            <button type='submit' className='button'>Enviar código</button>
        </form>
    )
}

export default Phone