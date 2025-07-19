import { useState } from "react"; 
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [cityInput, setCityInput] = useState(""); 
  const [data, setData] = useState<any>(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);

  // Функция для запроса погоды
  const fetchWeather = () => {
    //if (!cityInput.trim()) {
      //setError("Пожалуйста, введите название города.");
      //setData(null); // Очищаем предыдущие данные
      //return;
    //}
    setLoading(true);
    setError(null);
    setData(null); 

    fetch(`/api/weather?city=${encodeURIComponent(cityInput)}`) 
      .then((response) => {
        if (!response.ok) {
          // сообщение об ошибке от API
          return response
            .json()
            .then((errData) => {
              throw new Error(
                errData.message || `HTTP error! status: ${response.status}`
              );
            })
            .catch(() => {
              // Если тело ответа не JSON или пустое
              throw new Error(`HTTP error! status: ${response.status}`);
            });
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  // Обработчик нажатия Enter в поле ввода
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <>
      <div className="content-overlay">
        <Header />
        <main className="container mt-4">
          {" "}
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group input-group-lg mb-3 justify-content-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Введите город"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  onKeyPress={handleKeyPress} 
                />
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={fetchWeather} 
                  disabled={loading} 
                >
                  {loading ? "Загрузка..." : "Узнать погоду"}
                </button>
              </div>

              {/* Отображение ошибки */}
              {error && <div className="alert alert-danger mt-3">{error}</div>}

              {/* Отображение данных, если они есть и нет загрузки */}
              {!loading && data && (
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
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
