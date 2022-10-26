export interface Meteo {
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string,
    timezone_abbreviation: string,
    elevation: number,
    hourly_units: {
        time: string,
        temperature_2m: string,
        windspeed_10m: string
    },
    hourly: {
        time: [
            Date | string
        ],
        temperature_2m: [
            number | string
        ],
        windspeed_10m: [
            number | string
        ],
        weathercode: [
            number
        ]
    },
    daily_units: {
        time: string,
        weathercode: string,
        temperature_2m_max: string,
        temperature_2m_min: string
    },
    daily: {
        time: [
            Date
        ],
        weathercode: [
            number
        ],
        temperature_2m_max: [
            number
        ],
        temperature_2m_min: [
            number
        ]
    }
}
