import React, { useEffect } from 'react'
import location from '../../../assets/locationGray.svg'
import { motion } from "framer-motion";
import { BsCloudSun, BsFillCarFrontFill, BsFillHeartFill, BsSun } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { CiSun } from 'react-icons/ci';
import { BiTime, BiWalk } from 'react-icons/bi';
import { WiDayRainMix } from 'react-icons/wi';
import { RiMotorbikeFill, RiShipLine } from 'react-icons/ri';
import { IoMdBicycle } from 'react-icons/io';
import { FaBus } from 'react-icons/fa';
import { Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getPlacesAsync } from '../../../redux/actions/placesActions';

const Cards = (props) => {
const dispatch = useDispatch()
    const navigate = useNavigate()
    const { places } = useSelector(store => store.places)
    const { place } = useParams()

useEffect(() => {
  dispatch(getPlacesAsync())
}, [])

const placeCards = places[0]?.find(item => item.id === place)


    const variants = {
        hidden: {
          opacity: 0,
          x: "-100vw"
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 1
          }
        }
      };
    


  return (
    <>
     <motion.figure  initial="hidden"
               animate="visible"
               variants={variants}>
               <img src={props.imgPlace2} alt="caballo" className='home__main__photo' />
               <figcaption >
                 <h3>{props.name}{props.weather === "1" ? <BsCloudSun className='icons' /> : props.weather === "2" ? <CiSun className='icons' /> : props.weather === "3" ? <WiDayRainMix className='icons' /> : <BsSun className='icons' />}</h3>
                 <p onClick={() => navigate(`/description/${props.id}`)}>{props.description}</p>
                 <small><BiTime /> {props.schedules}</small>
                 <span> <img src={location} alt="location" />{` ${props.location} - ${props.department}`}</span>
                 <section>
                   {props.category.map((act, index) => <small key={index}>{act}</small>)}
                 </section>
                 <section>
                   {props.icons.map((icon, index) => {
                     if (icon === 'car') {
                       return <BsFillCarFrontFill key={index + 80} />

                     }
                     if (icon === 'moto') {
                       return <RiMotorbikeFill key={index + 25} />

                     }
                     if (icon === 'walking') {
                       return <BiWalk key={index + 38} />

                     }
                     if (icon === 'bici') {
                       return <IoMdBicycle key={index + 18} />

                     }
                     if (icon === 'bus') {
                       return <FaBus key={index + 10} />

                     }
                     if (icon === 'ship') {
                       return <RiShipLine key={index + 41} />
                     }
                   }
                   )}
                 </section>
                 <Rate disabled defaultValue={props.rate} />
                 <BsFillHeartFill className='heart' />
               </figcaption>
             </motion.figure>
    </>
  )
}

export default Cards