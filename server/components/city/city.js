function geoFindMe() {
    const status = document.querySelector("#status");
    const cityInput = document.querySelector("#city");
    const findMeButton = document.querySelector("#find-me");
  
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = "Fetching city name...";
  
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        .then(response => response.json())
        .then(data => {
          const city = data.address.city || data.address.town || data.address.village || data.address.hamlet || "Unknown location";
  
          status.textContent = `Locatie: ${city}`;
          cityInput.value = city; // <-- 👈 Fills the input field
          findMeButton.style.display = "none"; // <-- 👈 Hides the button
        })
        .catch(() => {
          status.textContent = "Unable to retrieve city name";
        });
    }
  
    function error() {
      status.textContent = "Unable to retrieve your location";
    }
  
    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  
  document.querySelector("#find-me").addEventListener("click", geoFindMe);