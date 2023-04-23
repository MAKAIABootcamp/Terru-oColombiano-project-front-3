import React from 'react'
import { motion } from "framer-motion";
import cafe from '../../assets/cafe.svg'
import './loader.scss'

const Loader = () => {
    
    return (
        <motion.div
          className="loader"
          animate={{ rotate: 360 }} 
          transition={{ duration: 1, repeat: Infinity }}
        >
          <img src={cafe} alt="loader" className='myIcon' />
        </motion.div>
      );
}

export default Loader