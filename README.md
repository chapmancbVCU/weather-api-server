# Weather API Server
A server whose purpose is to hide the API key used by the web applications that uses Open Weather Map as a source.


## Overview
It is always important to protect your API secrets.  Especially, if you spent money acquiring rights to use that API secret.  Currently, this weather api server supports the default free type of request and the one call request.  If you feel the need to add support for additional requests types please let us know.


## Setup Instructions
1. Clone the repository
2. Run the command "npm install"
3. Rename the ".env.sample" to ".env"
4. Replace the text "YOUR_API_KEY_HERE" with your actual API key.
3. Run the command "npm start"


## Examples
Shown below is an example function we created in our weather application for the free fetch request.  In the URL you will see a parameter labeled "type" and given the value "SIMPLE".  This tells the weather api server what type of request to perform against Open Weather Map.  Also note the parameter for hostname.  Currently we support the use of host names and IP addresses.  In our project we use "localhost".
```
/**
     * Returns the limited weather data using api call based on city name.
     * @param {String} city The locality whose weather we want to retrieve.
     * @param {String} hostname The hostname/IP Address for the Weather API 
     * server.
     * @returns The limited local weather data as a JSON string.
     */
    async getCityData(city: any, hostname: string) {
        try {
            const response = await fetch(`http://${hostname}:3000/api?type=SIMPLE&&city=${city}`);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
```

An example for a one call type request is as follows:
```
/**
     * Returns the detailed weather data of the user's location or search 
     * query.
     * @param {Number} latitude The latitude of user's location or search 
     * query.
     * @param {Number} longitude The longitude of user's location or search 
     * query.
     * @param {String} hostname The hostname/IP Address for the Weather API 
     * server.
     * @returns Detailed weather data as a JSON string.
     */
    async getWeatherData(latitude: number, longitude: number, hostname: string) {

        ...   

        try {
            const response = await fetch(`http://${hostname}:3000/api?type=ONECALL&lat=${latitude}&lon=${longitude}&units=${units}`);
            const weatherData = await response.json();
            return weatherData;
        } catch (error) {
            console.log(error);
        }
    }
```

Shown below is an example terminal output we added to assist in any debugging.
```
--------------------------------------------------------------------------------
QUERY INFORMATION
[Object: null prototype] {
  type: 'SIMPLE',
  city: 'Newport News, Virginia'
}

QUERY RESPONSE
{
  coord: { lon: -76.428, lat: 36.9788 },
  weather: [ { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' } ],
  base: 'stations',
  main: {
    temp: 271.18,
    feels_like: 264.85,
    temp_min: 269.81,
    temp_max: 272.58,
    pressure: 1023,
    humidity: 44
  },
  visibility: 10000,
  wind: { speed: 6.69, deg: 310 },
  clouds: { all: 0 },
  dt: 1705796412,
  sys: {
    type: 2,
    id: 2011320,
    country: 'US',
    sunrise: 1705752968,
    sunset: 1705789001
  },
  timezone: -18000,
  id: 4776024,
  name: 'Newport News',
  cod: 200
}
GET /api?type=SIMPLE&&city=Newport%20News,%20Virginia 200 247.061 ms - 487
[nodemon] restarting due to changes...
[nodemon] starting `node ./bin/www`
```