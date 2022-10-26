export interface Weather {
    coord: {
        lon: -0.13,
        lat: 51.51
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    main: {
        temp: number,
        humidity: number
    },
    wind: {
        speed: number
    },
    name: string,
    sys: {
        country: string
    }
}
