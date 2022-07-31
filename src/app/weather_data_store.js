import { configureStore } from '@reduxjs/toolkit';
// import { createReducer } from '@reduxjs/toolkit';
import { GET_DATA_INTO_REDUX_STORE_ACTION, UPDATE_CITY_REQUESTED } from './actions'


const initialState = {
  current_city:"Guatemala",
  id:"",
  name:"",
  country:"",
  coord:{
    lon:0.0,
    lat:0.0
  },
  weather:{
    summary:{
      title:"",
      description:"",
      icon:""
    },
    temperature:{
      actual:0.0,
      feelsLike:0.0,
      min:0.0,
      max:0.0
    },
    wind:{
      speed:0.0,
      deg:0
    },
    clouds:{
      all:0,
      visibility:0,
      humidity:0
    },
    timestamp:0
  }
}

const weatherCityDataReducer = (state=initialState, action) => { 
  switch (action.type) {
    case GET_DATA_INTO_REDUX_STORE_ACTION:
      console.log("reducer called")
      console.log('action payload : ', action.payload)
      return {
        ...state,
        id : action.payload.id,
        name : action.payload.name,
        country : action.payload.country,
        coord : {
          lon : action.payload.lon,
          lat : action.payload.lat
        },
        weather:{
          summary:{
            title:action.payload.title,
            description:action.payload.description,
            icon:action.payload.icon
          },
          temperature:{
            actual: action.payload.actual,
            feelsLike: action.payload.feelsLike,
            min: action.payload.min,
            max: action.payload.max,
          },
          wind:{
            speed: action.payload.speed,
            deg: action.payload.deg,
          },
          clouds:{
            all : action.payload.all,
            visibility : action.payload.visibility,
            humidity: action.payload.humidity
          },
          timestamp:action.payload.timestamp
        }
        
      }
    case UPDATE_CITY_REQUESTED:
      console.log("dispatched action to update_city_requested")
      console.log("city requested :", action.payload.city_requested)
      return {
        ...state, //just this would change at that time...
        current_city : action.payload.city_requested, 
      }
    default:
      return state
  }

}

export const weather_data_store = configureStore({
  reducer:weatherCityDataReducer
});
