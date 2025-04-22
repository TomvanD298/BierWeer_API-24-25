const title = document.querySelector("h1");

title.addEventListener("click", () => {
  if (title.textContent === "BierWeer") {
    title.textContent = "WeerBier";
  } else {
    title.textContent = "BierWeer"; // Optional: toggle back if you want!
  }
});