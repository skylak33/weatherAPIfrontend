import Header from "./components/Header";
import WeatherSearch from "./components/weatherSearch";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <div className="content-overlay">
        <Header />
        <main className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <WeatherSearch />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
