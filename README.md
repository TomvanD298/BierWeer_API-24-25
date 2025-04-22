# API @cmda-minor-web 2024 - 2025

{% for text in Readme %} <br>
  {{ text.Tom }} <br>
{% endfor %}


## Idee
Een app die bier aanbeveelt op basis van het weer en de locatie waar je bent.<br>


### concept
<img width="200" alt="Scherm met Haarlem" src="https://github.com/user-attachments/assets/0e68f98e-603c-439d-bc85-5fbd33b9a226" />
<img width="200" alt="Scherm met Amsterdam" src="https://github.com/user-attachments/assets/81384a49-275e-43ae-9fe4-94d056664c85" />
<img width="200" alt="Scherm met Landgraaf" src="https://github.com/user-attachments/assets/10f0ec53-d397-422d-91ff-11339bc23307" />
<img width="200" alt="Detailpagina van IJwit" src="https://github.com/user-attachments/assets/d96a5ef4-e95e-4f82-a0fe-d1b7bd12e1d3" />

## API
### Content API
- https://openweathermap.org/
- Eigen JSON file met allemaal bier erin (omdat er geen goede DB is...)
  Ik heb hier meerdere API's voor geraadpleegd. UNTAPD was veruit de beste(gratis) API, alleen zat deze achter slot en grendel voor bedrijven.<br>
  Ook heb ik andere gezocht, maar hier moet je na 100 calls voor betalen.<br>
  Hierdoor heb ik gekozen om zelf maar een JSON te maken met 20 goeie en verschillende biertjes.

### Web API
- https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API/Guide<br>
  Deze API is wel grappig, maar was maar een paar regels aan code, dus vond het niet genoeg.
- https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API<br>
  Ik heb de Canvas API gebruikt om de bubbeltjes op de achtergrond te maken. Dit deed ik eerst dus los met JS, maar heb dit dus vervangen door JS met Canvas.
- https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API<br>
  DMV deze kan ik de huidige locatie ophalen van de gebruiker. Hierdoor kan ik de stap overslaan waarin de gebruiker zelf de stad moet invullen. <br>
  Het enige nadeel is dat je van Apple permission nodig hebt om het te doen, dus je kan dit niet automatisch doen.<br>
  Ik kreeg eerst coördinaten terug, deze heb ik nog omgezet naar de locatie.

### Niet gelukt
- Gyroscope; Apple be like, fuck you<br>
  <img width="457" alt="Scherm­afbeelding 2025-04-15 om 11 04 12" src="https://github.com/user-attachments/assets/0aa1ca8c-8118-456d-9e6a-2389a25b633a" />
- UNTAPD: heb 3 mailtjes gestuurd of ik toegang mocht tot de API, nooit reactie gehad.

## Features
### Biertjes
### Bubbels
### Stad

