import { Component, OnInit } from '@angular/core';
import {JcdecauxService} from './jcdecaux.service';
import {Contract} from './contract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contractsArray = [];
  contractSelected: Contract;
  message: string;
  isSelected = false;

  constructor(private jcdecauxService: JcdecauxService) {}

  ngOnInit() {
    this.getJcdContracts();
  }

  updateFromChild($event): void {
    this.isSelected = false;
    this.contractSelected = null;
  }

  private isContractIsSelected(): void {
    if (this.contractSelected != null) {
      this.isSelected = true;
    }
  }

  private setContractSelected(name: string): void {
    this.contractSelected = this.contractsArray.filter(value => value.name === name);
  }

  private getJcdContracts(): void {
    this.message = null;
    this.jcdecauxService.getContracts().subscribe(
      val => {
        this.contractsArray = val;
        this.contractsArray = this.contractsArray.filter((contract) => contract.country_code === 'FR');
        this.contractsArray = this.contractsArray.sort((contract1: Contract, contract2: Contract) => contract1.name.localeCompare(contract2.name));
      },
      error => {
        this.message = error.message;
      },
      () => console.log('get contracts complet')
    );
  }
}
