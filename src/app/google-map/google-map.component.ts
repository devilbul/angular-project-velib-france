import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Station} from '../station';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  @Input()
  stationsArray: Station[];
  @Input()
  stationSelected: Station;
  @Output()
  change: EventEmitter<boolean> = new EventEmitter<boolean>();
  stationPlusDetails = new Map<number, boolean>();

  constructor() {}

  ngOnInit() {
    this.initStationPlusDetails();
  }

  private retour(): void {
    this.change.emit(false);
  }

  private changePlusDetails(key: number): void {
    this.stationPlusDetails.set(key, !this.stationPlusDetails.get(key));
  }

  private initStationPlusDetails(): void {
    for (let i = 0; i < this.stationsArray.length; i++) {
      if (this.calculDistance(this.stationSelected, this.stationsArray[i]) <= 500.0) {
        this.stationPlusDetails.set(i, false);
      }
    }
  }

  private calculDistance(stationOrigin: Station, stationDestination: Station): number {
    const lat1 = this.deg2Rad(stationOrigin.position.lat);
    const lat2 = this.deg2Rad(stationDestination.position.lat);
    const lonDif = this.deg2Rad(stationDestination.position.lng - stationOrigin.position.lng);

    const angle = Math.acos(Math.sin(lat2) * Math.sin(lat1) + Math.cos(lat2) * Math.cos(lat1) * Math.cos(lonDif));
    return Math.round(this.rad2Deg(angle) * 60 * 1.852 * 1000 * 10) / 10;
  }

  private deg2Rad(degres: number): number {
    return (degres * Math.PI) / 180;
  }

  private rad2Deg(radiant: number): number {
    return (radiant * 180) / Math.PI;
  }

  getLatStation(station: Station): number {
    return station.position.lat;
  }

  getLngStation(station: Station): number {
    return station.position.lng;
  }

  getDate(station: Station): string {
    return new Date(station.last_update).toTimeString();
  }
}
