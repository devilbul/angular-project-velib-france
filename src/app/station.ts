export class Station {
  constructor(
    public number: number,
    public name: string,
    public address: string,
    public position: {
      'lat': number,
      'lng': number
    },
    public banking: boolean,
    public bonus: boolean,
    public status: string,
    public contract_name: string,
    public bike_stands: number,
    public available_bike_stands: number,
    public available_bikes: number,
    public last_update: Date
  ) {}
}
