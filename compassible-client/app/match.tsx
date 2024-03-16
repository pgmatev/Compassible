import { LocationObject } from "expo-location"

interface Match {
    locationA: LocationObject;
    locationB: LocationObject;
    
}

function getMatch(match: Match){
    const latitudeA = match.locationA.coords.latitude
    const longitudeA = match.locationA.coords.longitude

    const latitudeB = match.locationB.coords.latitude
    const longitudeB = match.locationB.coords.longitude

    console.log("Angle between the coordinates:", angleBetweenCoordinates(latitudeA, longitudeA, latitudeB, longitudeB), "degrees");
}

// 42°41'10.7"N 23°19'58.5"E
// 42°41'08.4"N 23°20'02.8"E

function angleBetweenCoordinates(lat1:number, lon1:number, lat2:number, lon2:number) {
    // Convert latitude and longitude from degrees to radians
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    // Calculate differences in longitude and latitude
    const deltaLon = lon2Rad - lon1Rad;

    // Calculate the angle in radians
    const y = Math.sin(deltaLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(deltaLon);
    let angleRad = Math.atan2(y, x);

    // Ensure angle is within 0 to 2*pi range
    if (angleRad < 0) {
        angleRad += 2 * Math.PI;
    }

    // Convert the angle from radians to degrees
    let angleDeg = toDegrees(angleRad);

    // Convert angle to degrees in 360 degrees interval
    angleDeg = (angleDeg + 360) % 360;

    return angleDeg;
}

function toRadians(degrees:number) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians:number) {
    return radians * 180 / Math.PI;
}
