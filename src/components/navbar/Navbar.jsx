import React, { useState } from 'react'
import { BsFillHeartFill } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlineHome } from 'react-icons/ai'
import logo from '../../assets/cafe.svg'
import name from '../../assets/terruño.svg'
import hamburguer from '../../assets/icon-hamburger.svg'
import iconClose from '../../assets/icon-close.svg'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './navbar.scss'

const Navbar = () => {
    const [menu, setMenu] = useState('hidden')
    const [close, setClose] = useState('closeMenu')
    const [open, setOpen] = useState('')

    const openMenu = (icon) => {
        if (icon === "hamburguer") {
            setMenu('closeMenu')
            setClose('hidden')
            setOpen('open')

        }
        else {
            setMenu('hidden')
            setClose('closeMenu')
            setOpen('')
        }

    }


    const navigate = useNavigate()
    return (
        <>
        <header>
            <figure onClick={() => navigate('/')}>
                <img src={logo} alt="logo" />
                <img src={name} alt="terruño" />
            </figure>
            <nav className={open} >
                <ul>
                    <img src={iconClose} alt="cerrar" className={close} onClick={() => openMenu("close")} />
                    <NavLink to='/' className='navlink'><AiOutlineHome /> Inicio</NavLink>
                    <NavLink to='newPlace' className='navlink'><IoMdAddCircleOutline /> Agregar</NavLink>
                    <NavLink to='foro' className='navlink'><HiOutlineUserGroup /> Foro</NavLink>
                    <NavLink to='favorites'  className='navlink'><BsFillHeartFill className='heart' /> Favoritos</NavLink>
                    <NavLink to='user' className='navlink'><AiOutlineUser /> Cuenta</NavLink>

                </ul>


            </nav>
            <img src={hamburguer} alt="menu" className={menu} onClick={() => openMenu("hamburguer")} />
        </header>
        <Outlet />
        </>

    )
}

export default Navbar