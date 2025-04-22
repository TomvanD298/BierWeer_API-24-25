import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRecommendedBeers } from '../server/components/bier/weatherBeerMatcher.js';
import { beerColorMap } from '../server/components/bier/weatherBeerMatcher.js';


const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

app
  .use(logger())
  .use('/', sirv('dist'))
  // .use( '/', sirv(process.env.NODE_ENV ==='development' ? 'client' : 'dist'))
  .use('/public', sirv('public'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

  app.get('/', async (req, res) => {
    try {
      const apiKey = process.env.OpenWeatherKey;
      const city = req.query.city || 'Haarlem'; //default city
      const country = 'NL';
  
      const filename = fileURLToPath(import.meta.url);
      const dirname = path.dirname(filename);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=nl`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const weatherData = await response.json();

      const temp = weatherData.main.temp;
      const condition = weatherData.weather[0].main.toLowerCase();  
    
      // const temp = 1; // 🔥 Fake a hot summer day
      // const condition = 'moderate rain';
      
      const beerDataRaw = fs.readFileSync(path.join(dirname, '..', 'server', 'beer_list.json'));
      const beerList = JSON.parse(beerDataRaw);
      
      function getRandomItems(array, count) {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      }
      const recommendedBeers = getRecommendedBeers(beerList, temp, condition);
      const safeList = recommendedBeers.length ? recommendedBeers : beerList;
      const randomBeers = getRandomItems(recommendedBeers.length ? recommendedBeers : beerList, 3).map(beer => ({
        ...beer,
        color: beerColorMap[getBaseStyle(beer["Beer style"])] || '#f0f0f0'
      }));

      function getBaseStyle(style) {
        if (!style) return '';
        return Object.keys(beerColorMap).find(key =>
          style.toLowerCase().includes(key.toLowerCase())
        );
      }
      
      
      // Use these in your template
      return res.send(renderTemplate('server/views/index.liquid', {
        title: 'Home',
        bier: randomBeers,
        weather: {
          city,
          temperature: Math.round(temp),
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
  const id = parseInt(req.params.id, 10); // Ensure the ID is a number

  const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

  // Read the beer list from JSON file
  const beerDataRaw = fs.readFileSync(path.join(dirname, '..', 'server', 'beer_list.json'));
  const beerList = JSON.parse(beerDataRaw);

  // Find the beer with the matching ID
  const item = beerList.find(beer => beer.id === id);

  if (!item) {
    return res.status(404).send('Beer not found');
  }
  const beer = {
    id: item.id,
    name: item.Name,
    description: item.Description,
    abv: item.ABV,
    ibu: item.IBU,
    rating: item.Rating,
    style: item["Beer style"],
    brewer: item.Brewer,
    image: {
      src: item.Image,
      alt: item.Name
    }
  };
  

  return res.send(renderTemplate('server/views/detail.liquid', {
    title: `Detail page for ${beer.name}`,
    beer
  }));
});

const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

