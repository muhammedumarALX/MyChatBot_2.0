import { TextField } from '@mui/material';
import React from 'react'

type Props = {
    name: string;
    type: string;
    label: string;
}


const CustomizedInput = (props: Props) => {
  return (
    <TextField 
        margin='normal'
        name={props.name}
        type={props.type}
        label={props.label}
        InputLabelProps={{style: {color: "white"}}}
  InputProps={{style: {width: "400px", borderRadius: 10, fontSize: 20, margin: 2, color: "white"}}}
    />
  )
}

export default CustomizedInput
