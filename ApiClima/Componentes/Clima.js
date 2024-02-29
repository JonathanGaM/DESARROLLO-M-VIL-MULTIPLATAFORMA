import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Función para obtener los datos meteorológicos
const fetchWeatherData = async () => {
    try {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=1c0eb6a1aeb74b5cb0132356242902&q=Huejutla&days=5&aqi=no&alerts=no');
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

// Componente para mostrar cada tarjeta de pronóstico horario
const HourlyForecastCard = ({ time, temp, iconUrl }) => (
    <View style={styles.hourlyCard}>
        <Text style={styles.hourlyTime}>{time}</Text>
        <Image style={styles.hourlyImage} source={{ uri: iconUrl }} />
        <Text style={styles.hourlyTemp}>{temp}°C</Text>
    </View>
);

// Componente para mostrar el clima actual
const CurrentWeather = ({ weatherData }) => {
    const currentHour = new Date().getHours(); // Obtiene la hora actual en formato 24 horas

    // Filtra para obtener solo las horas desde la hora actual en adelante
    const filteredHours = weatherData.forecast.forecastday[0].hour.filter(item => {
        return new Date(item.time).getHours() >= currentHour;
    });

    return (
        <View style={[styles.weatherContainer, styles.currentWeatherContainer]}>
            <View style={styles.weatherScreen}>
                {/* Nombre de la ubicación */}
                <Text style={styles.locationName}>{weatherData.location.name}</Text>
                {/* Imagen de la condición climática actual */}
                <Image
                    style={styles.currentConditionImage}
                    source={{ uri: `https:${weatherData.current.condition.icon}` }}
                />
                {/* Temperatura actual */}
                <Text style={styles.currentTemp}>{weatherData.current.temp_c}°C</Text>
                {/* Texto de la condición climática actual y temperatura máxima/mínima */}
                <Text style={styles.conditionText}>
                    {weatherData.current.condition.text} - {weatherData.forecast.forecastday[0].day.maxtemp_c}°C / {weatherData.forecast.forecastday[0].day.mintemp_c}°C
                </Text>
                {/* Encabezado del pronóstico horario */}
                <Text style={styles.hourlyHeader}>Pronóstico del día</Text>
                {/* Lista horizontal del pronóstico horario */}
                <FlatList
                    data={filteredHours}
                    renderItem={({ item }) => (
                        <HourlyForecastCard
                            time={`${new Date(item.time).getHours()}:00`}
                            temp={item.temp_c}
                            iconUrl={`https:${item.condition.icon}`}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.hourlyList}
                />
            </View>
        </View>
    );
};

// Componente para mostrar cada elemento del pronóstico semanal
const WeeklyWeather = ({ forecast }) => {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    // Función para renderizar cada elemento del pronóstico semanal
    const renderItem = ({ item }) => {
        const date = new Date(item.date);
        const dayOfWeek = daysOfWeek[date.getDay()];
        return (
            <View style={styles.weeklyWeatherItem}>
                {/* Día de la semana */}
                <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
                <View style={styles.weatherDetails}>
                    {/* Temperatura máxima/mínima */}
                    <Text style={styles.temperature}>{item.day.maxtemp_c}°C / {item.day.mintemp_c}°C</Text>
                    {/* Icono de la condición climática */}
                    <Image style={styles.weatherIcon} source={{ uri: `https:${item.day.condition.icon}` }} />
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.weatherContainer, styles.weeklyWeatherContainer]}>
            {/* Lista del pronóstico semanal */}
            <FlatList
                data={forecast.forecastday}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.weeklyWeatherList}
            />
        </View>
    );
};

// Componente principal para la aplicación de clima
const Clima = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Efecto para cargar los datos meteorológicos al montar el componente
    useEffect(() => {
        const loadData = async () => {
            const data = await fetchWeatherData();
            setWeatherData(data);
            setIsLoading(false);
        };
        loadData();
    }, []);

    // Si se están cargando los datos, muestra un indicador de carga
    if (isLoading) {
        return (
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                <View style={styles.loadingScreen}>
                    <ActivityIndicator size="large" color={'#FFF'} />
                    <Text style={styles.loadingText}>Cargando datos...</Text>
                </View>
            </LinearGradient>
        );
    }

    // Cuando se cargan los datos, muestra el clima actual y el pronóstico semanal
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
            <View style={styles.container}>
                <FlatList
                    data={[{ key: 'currentWeather' }, { key: 'weeklyWeather' }]}
                    renderItem={({ item }) => {
                        if (item.key === 'currentWeather') {
                            return <CurrentWeather weatherData={weatherData} />;
                        } else if (item.key === 'weeklyWeather') {
                            return <WeeklyWeather forecast={weatherData.forecast} />;
                        }
                    }}
                    keyExtractor={item => item.key}
                />
            </View>
        </LinearGradient>
    );
};

// Estilos para los componentes
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    loadingScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#FFF',
    },
    weatherContainer: {
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    currentWeatherContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    },
    weeklyWeatherContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    },
    weatherScreen: {
        alignItems: 'center',
    },
    locationName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
    },
    currentConditionImage: {
        width: 100,
        height: 100,
        margin: 10,
    },
    currentTemp: {
        fontSize: 50,
        fontWeight: '300',
        color: '#FFF',
    },
    conditionText: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#FFF',
    },
    hourlyHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#FFF',
    },
    hourlyList: {
        marginBottom: 20,
    },
    card: {
        alignItems: 'center',
        marginRight: 10,
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardDate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cardImage: {
        height: 50,
        width: 50,
        margin: 5,
    },
    cardTemp: {
        fontSize: 16,
        color: '#333',
    },
    hourlyCard: {
        alignItems: 'center',
        marginRight: 10,
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        
    },
    hourlyTime: {
        fontSize: 16,
        color: 'white',
    },
    hourlyImage: {
        height: 40,
        width: 40,
        margin: 5,
    },
    hourlyTemp: {
        fontSize: 16,
        color: 'white',
    },
    weeklyWeatherList: {
        paddingHorizontal: 10,
    },
    weeklyWeatherItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
       
    },
    dayOfWeek: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    weatherDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    temperature: {
        fontSize: 14,
        marginRight: 10,
        color: 'white',
    },
    weatherIcon: {
        width: 40,
        height: 40,
    },
    container: {
        padding: 100
    }
});

export default Clima;
