import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import Logo from './shared/Logo'
import NavigationLink from './shared/NavigationLink'

const Header = () => {
  return (
    <AppBar sx={{bgcolor: 'transparent', position: 'static', boxShadow: 'none'}}>
        <Toolbar sx={{display: "flex"}}>
            <Logo/>
            <>
              <NavigationLink bg='#00ffcc' to='/login' text='Login' textColor='black' />
              <NavigationLink bg='#51538f' to='/signup' text='Signup' textColor='white' />
            </>
        </Toolbar>
    </AppBar>
  )
}

export default Header
