
import { useQuery, gql} from '@apollo/client';
import { WeatherDashboard } from './weatherDashboard';
import {weather_data_store} from '../app/weather_data_store'
import { GET_DATA_INTO_REDUX_STORE_ACTION, UPDATE_CITY_REQUESTED } from '../app/actions';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const GET_CITY_BY_NAME = gql`
query getCityByName($name:String!){ 
  getCityByName(name:$name, config:{units:metric, lang:en}){
   id
   name
   country
   coord {
     lon
     lat
   }
   weather{
     summary{
       title
       description
       icon
     }
     temperature{
       actual
       feelsLike
       min
       max
     }
     wind{
       speed
       deg
     }
     clouds{
       all
       visibility
       humidity
     }
     timestamp
   }
 }
}
`;

export function getDataIntoReduxStore(data) {

  let payload = {
    id : data.id,
    name : data.name,
    lon : data.coord.lon,
    lat : data.coord.lat,
    title : data.weather.summary.title,
    description : data.weather.summary.description,
    icon : data.weather.summary.icon,
    actual : data.weather.temperature.actual,
    feelsLike : data.weather.temperature.feelsLike,
    min : data.weather.temperature.min,
    max : data.weather.temperature.max,
    speed : data.weather.wind.speed,
    deg : data.weather.wind.deg,
    all : data.weather.clouds.all,
    visibility : data.weather.clouds.visibility,
    humidity : data.weather.clouds.humidity,
    timestamp : data.weather.timestamp
  }

  console.log('payload', payload)

  return {
     type: GET_DATA_INTO_REDUX_STORE_ACTION,
     payload
  }
}

export const DisplayWeatherDataComponent = () => {

    const handleTextFieldChange = event => {
      // setMessage(event.target.value);
      console.log('value is:', event.target.value);
    };  
    const updateCityRequested = () => {
      let textFieldValue = document.getElementById("cityNameTextField").value
      weather_data_store.dispatch({type: UPDATE_CITY_REQUESTED, payload : {city_requested : String(textFieldValue)}}) //storing the data into redux immediatly after the fetch succeeded
      console.log("updated the requested city in state : ", weather_data_store.getState())
    }

    console.log("About to do Apollo GraphQL Query: ")
    const { loading, error, data } = useQuery(GET_CITY_BY_NAME, { 
      variables: {
        name : weather_data_store.getState().current_city
      }
    });
    if (loading) return <div><p>'Loading...'</p></div>;
    if (error) return <div><p>`Error! ${error.message}`</p></div>;

    console.log("data fetched by Apollo GraphQL client : " , data)
    weather_data_store.dispatch(getDataIntoReduxStore(data.getCityByName)) //storing the data into redux immediatly after the fetch succeeded

    return (
        <div>
          
          <Box component="form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item>
                  <TextField id="cityNameTextField" label="Outlined" variant="outlined" onChange={ handleTextFieldChange }/>
                  <Button variant="contained" onClick = { updateCityRequested } >
                    Get Weather Data !
                  </Button>
                </Item>
              </Grid>
            </Grid>
          </Box>

          <WeatherDashboard/>
        </div>
    )
}

