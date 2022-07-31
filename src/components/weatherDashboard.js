// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import {weather_data_store} from '../app/weather_data_store'
// import { GET_DATA_INTO_REDUX_STORE_ACTION } from '../app/actions';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const WeatherDashboard = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item> 
            <h1>
              Location
            </h1>
            <p> Current City : {weather_data_store.getState().current_city} </p>
            <p> Id : {weather_data_store.getState().id} </p>
            <p> Name : {weather_data_store.getState().name} </p>
            <p> Longitude: {weather_data_store.getState().coord.lon} Latitude: {weather_data_store.getState().coord.lat} </p>
            <p> Timestamp: {weather_data_store.getState().weather.timestamp} </p>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item> 
            <h1>
              Weather
            </h1>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item> 
            <h2>
              Summary
            </h2>
            <p>
              Title : {weather_data_store.getState().weather.summary.title}
            </p>
            <p>
              Description : {weather_data_store.getState().weather.summary.description }
            </p>
            <p>
              Icon : {weather_data_store.getState().weather.summary.icon}
            </p>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item> 
            <h2>
              Temperature
            </h2>
            <p>
             Actual : {weather_data_store.getState().weather.temperature.actual}
            </p>
            <p>
             Feels Like :{weather_data_store.getState().weather.temperature.feelsLike}
            </p>
            <p>
              Min: {weather_data_store.getState().weather.temperature.min}  Max: {weather_data_store.getState().weather.temperature.min}
            </p>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item> 
            <h2>
              Wind
            </h2>
            <p>
              Speed: {weather_data_store.getState().weather.wind.speed}
            </p>
            <p>
              Deg: {weather_data_store.getState().weather.wind.deg}
            </p>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item> 
            <h2>
              Clouds
            </h2>
            <p>
              All : {weather_data_store.getState().weather.clouds.all}
            </p>
            <p>
              Visibility: {weather_data_store.getState().weather.clouds.visibility}
            </p>
            <p>
              Humidity : {weather_data_store.getState().weather.clouds.humidity}
            </p>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}