import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

// const beerData = {
//   '1': {
//     id: '1',
//     name: 'IJwitje',
//     image: {
//       src: 'https://i0.wp.com/www.brouwerijhetij.nl/wp-content/uploads/2017/06/240917_BROUWERIJ-HETIJ_Fles-33cl-GlasBlik_nat_IJwit.jpg?w=1000&ssl=1',
//       alt: 'ijwit',
//       width: 250,
//       height: 300,
//     }
//   },
//   '2': {
//     id: '2',
//     name: 'Skuumkoppe',
//     image: {
//       src: 'https://images.ctfassets.net/aqy2kesc4ox2/1J9hsqkHK5xjER6FAGrMqD/46ca33a0ce019255f4a9a1e685e42901/114SB1048_TEXELS_FLES_3D_2022_Fles_Glas_Blik_combinatie_HR_.png?w=1920',
//       alt: 'skuuumkoppe',
//       width: 250,
//       height: 300,
//     }
//   }
// };


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

  app.get('/beers/:id/', async (req, res) => {
    const id = req.params.id;
    const item = beerData[id];
    if (!item) {
      return res.status(404).send('Beer not found');
    }
    return res.send(renderTemplate('server/views/detail.liquid', {
      title: `Detail page for ${item.name}`,
      item: item
    }));
  });

  
const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};



