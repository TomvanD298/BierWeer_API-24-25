# API @cmda-minor-web 2024 - 2025

{% for text in Readme %} <br>
  {{ text.Tom }} <br>
{% endfor %}


## Idee
Een app die bier aanbeveelt op basis je locatie en het weer.<br>

### Screenshots
<img width="200" alt="Scherm met Haarlem" src="https://github.com/user-attachments/assets/4df80324-8c75-41df-b76f-ade6e5fc1ff0" />
<img width="200" alt="Scherm met Amsterdam" src="https://github.com/user-attachments/assets/83d32b68-fa1d-45f0-8246-67e1136c522d" />
<img width="200" alt="Scherm met Landgraaf" src="https://github.com/user-attachments/assets/d0fc288f-a897-44a1-8f8c-aaf0821cc809" />
<img width="200" alt="Detailpagina van Triple Karmaliet" src="https://github.com/user-attachments/assets/c2b18187-94b6-42b8-8808-7f3a9a9d86ed" />


## Features
### Weer
Het weer wordt opgehaald dmv de OpenWeather API. Ik heb Hardcoded eringezet dat het alleen steden in Nederland kunnen zijn. Hierbij geef ik ook mee dat het in graden Celsius moet en de taal in het Nederlands. Je kunt dus zoeken per stad, of d.m.v. de Geolocatie API je huidige locatie ophalen.<br>
<img width="150" alt="Weer" src="https://github.com/user-attachments/assets/5f16f84d-2336-493a-90cd-220a69674fab" />


### Biertjes
De biertjes worden opgehaald uit de JSON file(omdat het niet was gelukt om een goede gratis API te vinden). Deze hebben een aantal eigenschappen, zoals omschrijving, plaatje, brouwerij, bierstijl etc..<br>
De biertjes op de homepage worden weergegeven op basis van het weer. Met de logica dat de temperatuur invloefd heeft op de bierstijl. Dus als het warm is wordt er een wit biertje aanbevolen
en als koud is en regend een stout.<br>
<img width="400" alt="Scherm­afbeelding 2025-04-23 om 09 49 55" src="https://github.com/user-attachments/assets/c3e6e270-c04c-44ad-b229-911d37ac4277" /><br>
Het enige nadeel is dat, als het bijvoorbeeld lekker weer is maar -5 graden, hij toch altijd een tripel of ander donker biertje aanbeveelt.
In een volgende iteratie zou deze logica nog verder verfijnd kunnen worden.
<br><br>
De Biertjes op de homepagina hebben ook allemaal een andere kleur op basis van hun bierstijl, dus de stouts zijn bruin en de witbiertjes zijn licht.<br>
<img width="200" alt="Scherm­afbeelding 2025-04-23 om 09 54 23" src="https://github.com/user-attachments/assets/eb2ab5b6-e025-4a61-b321-36168fbdf8d2" />

### Bubbels
De Bubbels heb ik gemaakt met de Canvas API. Deze worden ook gerenderd op basis van het weer. Het aantal bubbeltjes is de temperatuur X 2. Dus hoe warmer, hoe meer bubbeltjes!

### Stad
Je kan zoeken op de stad waar je het weer van wilt weten. Dmv het rode pinnetje kan je de huidige locatie ophalen van de gebruiker. Deze wordt meteen in het input veld gedaan zodat dit weer een stap scheelt.<br>
<img width="250" alt="Scherm­afbeelding 2025-04-23 om 09 57 17" src="https://github.com/user-attachments/assets/14fcaef0-d4e7-415f-b807-791b1d878655" /><br>
Bij het versturen wordt de stad meegegeven in de API call, waardoor je de temperatuur van die stad terug krijgt.<br>
Het enige wat ik nog niet heb kunnen toepassen is een soort autocomplete, dus als je de stad verkeerd schrijft, werkt de app niet meer.

### Logo
Is het Bierweer of is het tijd voor weerBier? wie weet? Als je op de tekst klikt kan je er achter komen.



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
  D.m.v deze API kan ik de huidige locatie ophalen van de gebruiker. Hierdoor kan ik de stap overslaan waarin de gebruiker zelf de stad moet invullen. <br>
  Het enige nadeel is dat je van Apple permission nodig hebt om het te doen, dus je kan dit niet automatisch doen.<br>
  Ik kreeg eerst coördinaten terug, deze heb ik nog omgezet naar de locatie.



## Proces
### API
Ik heb al eerder gewerkt met API's, dus dit was niet heel nieuw voor mij. Ik ben begonnen met de OpenWeatherAPI, deze was erg goed gedocumenteerd en makkelijk te gebruiken.<br>
Voordat ik begon met de API in mijn code, ben ik eerst de endpoints gaan testen in Postman. Dit vind ik erg handig en kan je van te voren uitzoeken hoe een API werkt zonder dat je al werkende code moet hebben.

Ik baal wel een beetje van de Bier api's. Hier ben ik namelijk een goede dag mee bezig geweest met 0 resultaat. Ik heb verschillende bedrijven een mailtje gestuurd met de vraag of ik dit als schoolproject mag gebruiken. Geen van hen heeft gereageerd..<br>
Hierdoor heb ik maar samen met de docent besloten om er een JSON file van te maken met circa 20 biertjes van verschillende soorten.<br>
Ik heb de app zo gebouwd, dat mocht ik nog wel een reactie krijgen van die bedrijven, dat ik maar een paar dingetjes hoef aan te passen en dat het al meteen werkt.


### Liquid en TinyHTTP
Liquid en TinyHTTP was nieuw voor mij. Ik heb tijdens mijn stage wel al een beetje met Vue gewerkt. Dit is ook een framework, dus ik wist al een beetje hoe ik mij hier in moest navigeren.<br>
Ik vond het in het begin toch nog even wennen omdat ik niet echt eerder met componenten heb gewerkt, maar ik vind dit achteraf toch wel heel erg fijn.

### Helaas niet gelukt
- Gyroscope; Apple be like, fuck you<br>
  <img width="500" alt="Scherm­afbeelding 2025-04-15 om 11 04 12" src="https://github.com/user-attachments/assets/0aa1ca8c-8118-456d-9e6a-2389a25b633a" />
- UNTAPD: heb 3 mailtjes gestuurd of ik toegang mocht tot de API, nooit reactie gehad.
- Rapid API: Hier waren wel een aantal bier API's, maar hier had je maar 100 calls, en als je er meer wilde moet je betalen...
- Had nog een aantal API's gevonden, maar hier was geen documentatie van of niet meer onderhouden sinds 2012..



