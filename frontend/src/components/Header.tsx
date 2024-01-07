import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import { useAuth } from '../context/AuthContext'
import Logo from './shared/Logo'
import NavigationLink from './shared/NavigationLink'

const Header = () => {
    const auth = useAuth();
  return (
    <AppBar sx={{bgcolor: 'transparent', position: 'sticky', boxShadow: 'none'}}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between", width: "95%"}}>
            <Logo/>
            <div>
                {auth?.isLoggedIn ? (
                    <>
                        <NavigationLink bg='#00ffcc' to='/chat' text='Chats' textColor='black' />
                        <NavigationLink bg='#51538f' to='/' text='Logout' textColor='white' onClick={auth?.logout}/>
                    </>
                ):
                (
                    <>
                        <NavigationLink bg='#00ffcc' to='/login' text='Login' textColor='black' />
                        <NavigationLink bg='#51538f' to='/signup' text='Signup' textColor='white' />
                    </>
                )
                }
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default Header
