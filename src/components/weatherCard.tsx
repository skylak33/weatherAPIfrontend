import React from "react";

interface WeatherCardProps {
    data: any;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
    return (
        <div className="card mt-3">
        <div className="card-body">
          <h2 className="card-title text-center">
            {data.city} {data.temp[0]} °C
          </h2>
          <h3 className="card-subtitle mb-2 text-muted text-center">
            Feels like: {data.feelslike[0]} °C
          </h3>
          <h3 className="card-text text-center">
            Wind speed: {data.windspeed[0]} м/с
          </h3>
          <h3 className="card-subtitle mb-2 text-muted text-center">
            Conditions: {data.conditions[0]}
          </h3>
        </div>
      </div>
    );
}


export default WeatherCard