import React from "react";
import { WiDaySunny, WiDayCloudy, WiCloudy, WiCloud , WiDayShowers, WiDayRain, WiDayThunderstorm , WiDaySnow , WiDust} from "react-icons/wi";



const weatherIcons =
        [ 
         {oldIcon: "01d",
         oldIconN: "01n",
        newIcon: <WiDaySunny /> }, 

        {oldIcon: "02d",
        oldIconN: "02n",
        newIcon: <WiDayCloudy />}, 

        {oldIcon: "03d",
        oldIconN: "03n",
        newIcon: <WiCloud /> }, 
        
        {oldIcon: "04d",
        oldIconN: "04n",
        newIcon: <WiCloudy /> },

        {oldIcon: "09d",
        oldIconN: "09n",
        newIcon: <WiDayShowers /> },
       
        {oldIcon: "10d",
        oldIconN: "10n",
        newIcon: <WiDayRain /> },

        {oldIcon: "11d",
        oldIconN: "11n",
        newIcon: <WiDayThunderstorm /> },
      
        {oldIcon: "13d",
        oldIconN: "13n",
        newIcon: <WiDaySnow /> },

        {oldIcon: "50d",
        oldIconN: "50n",
        newIcon: <WiDust/> },

        ]




            
const Icon  = (props) => {
    

let oldimg = props.oldimg

function findIcon () {
for ( let i in weatherIcons ) {
    {console.log(i)}
    {console.log(oldimg)}
    if (oldimg === weatherIcons[i].oldIcon || oldimg === weatherIcons[i].oldIconN) {
        
        let logo =  weatherIcons[i].newIcon;
        {console.log(logo)}
        return logo;
            
        
    }
}
}

return (
    <div>
{findIcon()}
</div>
);

/*
const swappedIcons = weatherIcons.map (icons => {
    if (iconImage == icons.oldIcon) {
        return (
        <div>
        <icons.newIcon />
            worked
        </div> 
            ) ; 
    }
    
   else {
        return (
            <div> 
        hello
            </div>
        )  
    } 
    
}) 


return (
    <div> 
           
 {swappedIcons}
 </div>
);

*/


}

export default Icon; 