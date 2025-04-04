import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';


const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();


app
  .use(logger())
  .use('/', sirv(process.env.NODE_ENV === 'development' ? 'client' : 'dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

  app.get('/', async (req, res) => {
    try {
      const apiKey = process.env.OpenWeatherKey;
      const city = 'Amsterdam';
      const country = 'NL';
  
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=nl`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const weatherData = await response.json();
  
      return res.send(renderTemplate('server/views/index.liquid', {
        title: 'Home',
        weather: {
          city: weatherData.name,
          temperature: Math.round(weatherData.main.temp),
          description: weatherData.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
        }
      }));
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return res.status(500).send('Error fetching weather data');
    }
  });
  

const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

