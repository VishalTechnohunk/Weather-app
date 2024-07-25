const input = document.getElementById("City-input");
const button = document.getElementById("Search-button");
const weatherInfo = document.getElementById("weather-info");
const weatherImage = document.getElementById("weather-image");

button.addEventListener("click", async () => {
  const cityName = input.value;
  const url = `https://open-weather13.p.rapidapi.com/city/${cityName}/EN`;
  const options = {
    method: "GET",
    headers: {
   'x-rapidapi-key': 'f71ced5d5cmsh6977ce00554178bp1c5362jsndc33b8ecde10',
		'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    // Extracting the relevant information
    const city = result.name;
    const temperature = result.main.temp;
    const humidity = result.main.humidity;
    const windSpeed = result.wind.speed;
    const weatherCondition = result.weather[0].main;

    // Displaying the information
    weatherInfo.innerHTML = `
      <p>City: ${city}</p>
      <p>Temperature: ${temperature} °C</p>
      <p>Humidity: ${humidity} %</p>
      <p>WindSpeed: ${windSpeed} m/s</p>
    `;

    // Setting the weather image based on the weather condition
    let weatherImageUrl = "";
    switch (weatherCondition.toLowerCase()) {
      case "clear":
        weatherImageUrl = "https://c0.wallpaperflare.com/preview/913/700/937/sky-clouds-blue-skies.jpg";
        break;
      case "clouds":
        weatherImageUrl = "https://images.unsplash.com/photo-1500740516770-92bd004b996e?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFyayUyMGNsb3VkeSUyMHNreXxlbnwwfHwwfHx8MA%3D%3D";
        break;
      case "rain":
        weatherImageUrl = "https://img.freepik.com/premium-vector/dense-white-sun-lighted-clouds-producing-pouring-rain-against-blue-sky-background_1284-56866.jpg";
        break;
      case "snow":
        weatherImageUrl = "https://img.freepik.com/free-photo/view-snowy-mountain-fir-trees-with-blue-sky-background_9083-8044.jpg";
        break;
      default:
        weatherImageUrl = "https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/19282002/joker_3.jpg?quality=90&strip=all&crop=7.8173981191223%2C0%2C84.365203761755%2C100&w=2400";
        break;
    }

    weatherImage.innerHTML = `<img src="${weatherImageUrl}" alt="${weatherCondition}" style="padding-left: 5px;
    width: 222px;
    height: 182px; filter: drop-shadow(0 0 0.75rem crimson);">`;
  } catch (error) {
    console.error(error);
    weatherInfo.innerHTML = `<p>Could not fetch weather data. Please try again.</p>`;
    weatherImage.innerHTML = "";
  }
});
