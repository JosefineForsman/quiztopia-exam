import { Coordinates } from '../interfaces';

async function getPosition(): Promise<Coordinates>{
    return new Promise((resolve, reject)=>{
        if ('geolocation' in navigator){
            const geo = navigator.geolocation;
            geo.getCurrentPosition(
                pos => {
                const position: Coordinates = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                }
                sessionStorage.setItem('latitude', JSON.stringify(position.latitude));
                sessionStorage.setItem('longitude', JSON.stringify(position.longitude));

                resolve(position)
                console.log(position)
            }, error=>{
                reject(error.message)
                console.log('du har fått fel', error)
            })
        } else{
            reject('Please upgrade your browser to use this app')
        }
    })
}
export {getPosition};