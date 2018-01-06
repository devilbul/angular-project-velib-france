import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Station} from '../station';
import {JcdecauxService} from '../jcdecaux.service';
import {Contract} from '../contract';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  @Input()
  contract: Contract;
  @Output()
  changeVille: EventEmitter<string> = new EventEmitter<string>();
  contract_name: string;
  stationsArray: Station[];
  stationHistoric = [];
  message: string;
  stationSelected: Station;
  isSelected = false;

  constructor(private jcdecauxService: JcdecauxService) {}

  ngOnInit() {
    this.contract_name = this.contract[0].name;
    this.getJcdStations(this.contract_name);
  }

  private retour(): void {
    this.changeVille.emit('changeVille');
  }

  updateFromChild($event): void {
    this.isSelected = $event;

    if (!this.containsStation(this.stationSelected)) {
      this.stationHistoric.push(this.stationSelected);
    }

    this.stationSelected = null;
  }

  private isStationHistoricIsSelected(index: number): void {
    if (this.stationHistoric.length > 0) {
      this.stationSelected = this.stationHistoric[index];
      this.isSelected = true;
    }
  }

  private isStationIsSelected(): void {
    if (this.stationSelected != null) {
      this.isSelected = true;
    }
  }

  private containsStation(station: Station): boolean {
    for (let i = 0; i < this.stationHistoric.length; i ++) {
      if (this.stationHistoric[i].name === station.name) {
        return true;
      }
    }

    return false;
  }

  private setStationSelected(id: any): void {
    this.stationSelected = this.stationsArray.filter(value => value.number === parseInt(id, 10))[0];
  }

  private getJcdStations(contract_name: string): void {
    this.message = null;
    this.jcdecauxService.getStations(contract_name).subscribe(
      val => {
        this.stationsArray = val;
        this.stationsArray = this.stationsArray.sort((station1: Station, station2: Station) => station1.number - station2.number);
      },
      error => {
        this.message = error.message;
      },
      () => console.log('get station complet')
    );
  }

}
