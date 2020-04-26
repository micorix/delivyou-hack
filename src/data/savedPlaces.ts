export interface SavedPlace{
    name: string
    id: string
    data: {
        recipient: string
        street: string,
        houseNo: number,
        apartmentNo?: number
        notes?: string
    }
}

const savedPlaces: SavedPlace[] = [
    {
        name: 'Dom',
        id: "home",
        data: {
            recipient: 'Jan Kowalski',
            street: 'Wiśniowa',
            houseNo: 19,
            apartmentNo: 12,
            notes: ''
        }
    }
];
export default savedPlaces;
