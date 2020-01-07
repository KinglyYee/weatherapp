import React from "react";
//import logo from './logo.svg';
//import "./App.css";

// Components
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Toolbar from "./components/toolbar";
const API_KEY = "bf054dfb03f13c663aed25045bdc281e";

class App extends React.Component{
    // Required informations
    state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined,
    }


    getWeather = async (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    // CHECK IF CITY AND COUNTRY EXUSTS SO IT DOES NOT CRASH
    //JAVA SCRIPT RETURNS A FALSE IF STRING IS EMPTY
    if(city && country) {
      console.log(data);
      // SET STATE, DON'T MANIPULATE STATE VARIABLES
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        // returns an array so access it using indexing
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        // returns an array so access it using indexing
        description: undefined,
        error: "Invalid input"
      });
    }
  }
  render() {
    return(
      <div>
        <div className = "wrapper">
          <div className = "main">
            <div className = "container">
              <div className = "row">
                <div className = "col-xs-5 title-container">
                  <Titles />
                </div>
                <div className = "col=xs=7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather
                    temperature = {this.state.temperature}
                    city = {this.state.city}
                    country = {this.state.country}
                    humidity = {this.state.humidity}
                    description = {this.state.description}
                    error = {this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default App;
