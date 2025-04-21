import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Пример запроса к вашему API
    fetch("/api/weather") // Используем путь, настроенный в proxy
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
  }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <>
      <h1>Погода</h1>
      {/* Отображение данных, полученных от API */}
      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
      <div>
        <h2>Город: {data.city}</h2>
        <h3>Время: {data.datetime}</h3>
        <h3>Температура: {data.temp} °C</h3>
      </div>
    </>
  );
}

export default App;
