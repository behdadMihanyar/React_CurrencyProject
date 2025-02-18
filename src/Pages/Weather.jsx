/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
const Weather = () => {
  const weatherData = () => {
    return axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=35.41&longitude=51.25&hourly=temperature_2m,apparent_temperature&timezone=auto&forecast_days=1"
    );
  };
  const { data, isLoading } = useQuery({
    queryKey: ["name"],
    queryFn: weatherData,
  });
  if (!data) return null;
  return (
    <div>
      {data.data.hourly.temperature_2m.map((item) => (
        <h1 key={Math.random()}>{item}</h1>
      ))}
    </div>
  );
};

export default Weather;
