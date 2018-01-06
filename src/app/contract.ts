export class Contract {
  constructor(
    public name: string,
    public commercial_name: string,
    public country_code: string,
    public cities: string[],
  ) {}
}
