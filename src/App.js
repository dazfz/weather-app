import React, { useState } from "react";
import { Box, Button, Input, Text, Flex, Image } from "@chakra-ui/react";

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null); // mostrar error
  const [unit, setUnit] = useState("C"); // cambiar unidad celcius o fahrenheit
  const [loading, setLoading] = useState(false); // si esta cargando la data

  // 1. Obtener el lugar
  const handleLocationChange = (event) => setLocation(event.target.value);

  // 2. Obtener los datos de la API
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=1b55b92c2de34b19b64155002231405&q=${location}`
      );

      if (response.ok) {
        const data = await response.json();
        const processedData = processWeatherData(data);
        setWeatherData(processedData);
        setError(null);
        setLocation(""); // Limpiar el campo de entrada
      } else {
        setError("Failed to fetch weather data");
        setWeatherData(null);
      }
    } catch (error) {
      setError("Failed to fetch weather data");
      setWeatherData(null);
    } finally {
      setLoading(false); // Finalizar la carga, independientemente del resultado
    }
  };

  // 3. Procesar data
  const processWeatherData = (data) => {
    const { location, current } = data;
    // https://www.weatherapi.com/docs/
    const processedData = {
      location: location.name,
      tc: current.temp_c,
      tf: current.temp_f,
      condition: current.condition.text,
      icon: current.condition.icon,
    };
    return processedData;
  };

  const toggleUnit = () => setUnit(unit === "C" ? "F" : "C");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Weather App
      </Text>
      <Box mb={4}>
        <Input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleLocationChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") fetchWeatherData();
          }}
        />
      </Box>
      <Box mb={4}>
        <Button
          onClick={fetchWeatherData}
          mr={2}
          isLoading={loading}
          loadingText="Fetching data"
        >
          Get Weather
        </Button>
        <Button onClick={toggleUnit}>°{unit}</Button>
      </Box>

      {error && <Text color="red">{error}</Text>}

      {weatherData && (
        <Flex
          textAlign="center"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            {weatherData.location}
          </Text>
          <Text mb={2}>
            Temperature: {unit === "C" ? weatherData.tc : weatherData.tf} °
            {unit}
          </Text>
          <Text mb={2}>Condition: {weatherData.condition}</Text>
          <Image src={weatherData.icon} />
        </Flex>
      )}
    </Box>
  );
}

export default App;
