import React from "react";

interface CitySearchProps {
    cityInput: string;
    onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onSearch: () => void;
    loading: boolean;
}

const CitySearch: React.FC<CitySearchProps> = ({
    cityInput,
    onCityChange,
    onKeyPress,
    onSearch,
    loading,
}) => {
    return (
        <div className="input-group input-group-lg mb-3 justify-content-center">
        <input
        type="text"
        className="form-control"
        placeholder="Введите город"
        value={cityInput}
        onChange={onCityChange}
        onKeyPress={onKeyPress}
        />
        <button
        className="btn btn-secondary"
        type="button"
        onClick={onSearch}
        disabled={loading}
        >
        {loading ? "Загрузка..." : "Узнать погоду"}
        </button>
    </div>
  );
}

export default CitySearch;