export async function fetchWeather(city: string) {
    if (!city) {
        throw new Error("Пожалуйста, введите название города.");
    }
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    if (!response.ok) {
        try {
            const errorData = await response.json();
            throw new Error(errorData.message || "Ошибка при получении данных с сервера");
        } catch {
            throw new Error("Ошибка при получении данных с сервера");
        }
    }
    return response.json();
}
