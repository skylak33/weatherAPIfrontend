import React from "react";

interface WeatherWeekCardProps {
    city: string;
    dates: string[];
    temps: number[];
    feelsLike: number[];
    windSpeeds: number[];
    conditions: string[];
}

const WeatherWeekCard: React.FC<WeatherWeekCardProps> = ({
    dates,
    temps,
    feelsLike,
    windSpeeds,
    conditions,
}) => {
    const weekDates = dates.slice(0, 7);
    const weekTemps = temps.slice(0, 7);
    const weekFeelsLike = feelsLike.slice(0, 7);
    const weekWindSpeeds = windSpeeds.slice(0, 7);
    const weekConditions = conditions.slice(0, 7);
    return (
    <div className="card mt-3">
        <div className="card-body">
            <h4 className="card-title text-center">Прогноз на неделю</h4>
            <div className="row">
                {weekDates.map((date, idx) => (
                    <div className="col text-center" key={idx}>
                        <div>
                            {(() => {
                                const [year, month, day] = date.split("-");
                                return `${day}.${month}`;
                            })()}
                        </div>
                        <div>{weekTemps[idx]}°C</div>
                        {/*<div>Ощущается как: {feelsLike[idx]} °C</div>*/}
                        <div>{weekWindSpeeds[idx]}м/с</div>
                        {/*<div>{conditions[idx]}</div>*/}
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};

export default WeatherWeekCard;