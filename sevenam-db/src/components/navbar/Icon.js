import React from "react";
import { WiDaySunny, WiDayCloudy, WiCloudy, WiCloud , WiDayShowers, WiDayRain, WiDayThunderstorm , WiDaySnow , WiDust} from "react-icons/wi";



const weatherIcons =
        [ 
         {oldIcon: "01d",
         oldIconN: "01n",
        newIcon: <WiDaySunny size={"60px"}/> }, 

        {oldIcon: "02d",
        oldIconN: "02n",
        newIcon: <WiDayCloudy size={"60px"}/>}, 

        {oldIcon: "03d",
        oldIconN: "03n",
        newIcon: <WiCloud size={"60px"}/> }, 
        
        {oldIcon: "04d",
        oldIconN: "04n",
        newIcon: <WiCloudy size={"60px"} /> },

        {oldIcon: "09d",
        oldIconN: "09n",
        newIcon: <WiDayShowers size={"60px"}/> },
       
        {oldIcon: "10d",
        oldIconN: "10n",
        newIcon: <WiDayRain size={"60px"}/> },

        {oldIcon: "11d",
        oldIconN: "11n",
        newIcon: <WiDayThunderstorm size={"60px"}/> },
      
        {oldIcon: "13d",
        oldIconN: "13n",
        newIcon: <WiDaySnow size={"60px"}/> },

        {oldIcon: "50d",
        oldIconN: "50n",
        newIcon: <WiDust size={"60px"}/> },

        ]




            
const Icon  = (props) => {
    

let oldimg = props.oldimg

function findIcon () {
for ( let i in weatherIcons ) {
    if (oldimg === weatherIcons[i].oldIcon || oldimg === weatherIcons[i].oldIconN) {
        
        let logo =  weatherIcons[i].newIcon;
        return logo;
            
        
    }
}
}

return (
    <div className="weather-icon">
{findIcon()}
</div>
);



}

export default Icon; 
