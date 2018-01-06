export class UrlBuilder {

  constructor(private url: string, private token: string) {}

  getUrlForGetStations(contract_name: string): string {
    return this.appendToken(`${this.url}/stations?contract=${contract_name}`);
  }

  getUrlForGetContractName(): string {
    return this.appendToken(`${this.url}/contracts?contracts`);
  }

  private appendToken(url: string): string {
    if (this.token) {
      return url + `&apiKey=${this.token}`;
    }
    return url;
  }
}
