export interface Geocode {
    items: [
        {
            title: string,
            id: string,
            resultType: string,
            administrativeAreaType: string,
            address: {
                label: string,
                countryCode: string,
                countryName: string,
                state: string
            },
            position: {
                lat: number,
                lng: number
            },
            mapView: {
                west: number,
                south: number,
                east: number,
                north: number
            },
            scoring: {
                queryScore: number,
                fieldScore: {
                    state: number
                }
            }
        }
    ]
}
