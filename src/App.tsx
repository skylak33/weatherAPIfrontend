import { useState } from "react"; // Убрали useEffect, так как запрос будет по кнопке
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [cityInput, setCityInput] = useState(""); // Состояние для поля ввода города
  const [data, setData] = useState<any>(null); // Используем any или создаем интерфейс для data
  const [loading, setLoading] = useState(false); // Изначально не загружаем
  const [error, setError] = useState<string | null>(null);

  // Функция для запроса погоды
  const fetchWeather = () => {
    if (!cityInput.trim()) {
      setError("Пожалуйста, введите название города.");
      setData(null); // Очищаем предыдущие данные
      return;
    }
    setLoading(true);
    setError(null);
    setData(null); // Очищаем предыдущие данные перед новым запросом

    fetch(`/api/weather?city=${encodeURIComponent(cityInput)}`) // Добавляем город как query parameter
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
      <Header />
      <main className="container mt-4">
        {" "}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group input-group-lg mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Введите город"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyPress={handleKeyPress} // Добавляем обработчик Enter
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={fetchWeather} // Вызываем функцию запроса по клику
                disabled={loading} // Блокируем кнопку во время загрузки
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
                  <h2 className="card-title">Город: {data.city}</h2>
                  <h3 className="card-subtitle mb-2 text-muted">
                    Время: {new Date(data.datetime).toLocaleString()}
                  </h3>
                  <h3 className="card-text">Температура: {data.temp} °C</h3>
                  {/* Добавьте сюда другие данные, если они есть в ответе API */}
                  {/* Например: <p className="card-text">Описание: {data.description}</p> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
