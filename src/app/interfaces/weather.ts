export interface Weather {
    weather: {
        id: number,
        main: string,
        description: string
    },
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
