import React from 'react'

import Image from "next/image";


type IconProps = {
    width:number
    height:number
    alt:string
    iconstr:string
}

const WeatherIcon:React.FC<IconProps> = ({...props}) => {
  return (
    <Image
    src={
        "http://openweathermap.org/img/wn/" +
        props.iconstr +
        "@2x.png"
      }
    {...props}
  />
  )
}

export default WeatherIcon