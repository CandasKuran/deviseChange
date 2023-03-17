import {Component, Input, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTable} from "@angular/material/table";
import {DialogoverComponent} from "./tools/dialogover.component";
import {MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AppComponent {

  title = "'Generation du devis'"
  Designation: string | undefined;
  ligneData = ELEMENT_DATA;
  groupData = GROUP_DATA;
  columnsToDisplay = ['Designation', 'Qte', 'Unite', 'PU', 'Total'];
  sousColumnsToDisplay = ['Designation', 'Qte', 'Unite', 'PU', 'Total'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  // @ts-ignore
  expandedElement: GroupChiffrage | PeriodicElement | null;




  // @ts-ignore
  @ViewChild(MatTable) table: MatTable<GroupChiffrage>;
  // @ts-ignore
  @ViewChild(MatTable) sousTable: MatTable<GroupChiffrage>;

  constructor(public dialog: MatDialog) {}
  addData() {
    const dialogRef = this.dialog.open(DialogoverComponent, {
      data: {Designation: this.Designation},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Designation = result;
      this.groupData.push({Designation:result, Total:0, Qte:0, Unite:0, PU:0 });
      this.table.renderRows();
    });

  }

  removeData() {
    this.groupData.pop();
    this.table.renderRows();
  }
  addDataSousGroup(row: any) {
    const dialogRef = this.dialog.open(DialogoverComponent, {
      data: {Designation: this.Designation},
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Designation = "======> " + result;
  
      // Get index of selected row
      const index = this.groupData.findIndex(item => item === row);
  
      // Add new sub-group to groupData array
      this.groupData.splice(index + 2, 0, {
        
        Designation:this.Designation, 
        Total: 0,
        Qte: 0,
        Unite: 0,
        PU: 0 
        
        
        
      });
  
      // Render the rows again
      this.sousTable.renderRows();
    });
  }
}


export interface GroupChiffrage {
  Designation: string;
  Total: number;
  Qte: number;
  Unite: number;
  PU: number;
}

export interface PeriodicElement {
  Designation: string;
  Qte: number;
  Unite: number;
  PU: number;
  Total: string;
}



const GROUP_DATA: GroupChiffrage[] = [
  {
    Designation: "Installation Chauffage",
    Total: 0,
    Qte: 0,
    Unite: 0,
    PU: 0
  },
  {
    Designation: "Material",
    Total: 0,
    Qte: 0,
    Unite: 0,
    PU: 0
  },
  {
    Designation: "Main d'Oeuvre",
    Total: 0,
    Qte: 0,
    Unite: 0,
    PU: 0
  },
  {
    Designation: "Installation sanitaire",
    Total: 0,
    Qte: 0,
    Unite: 0,
    PU: 0
  }
]

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Qte: 1,
    Designation: 'Installation chauffage',
    Unite: 1.0079,
    PU: 0,
    Total: `---------------------------------`,
  },
  {
    Qte: 2,
    Designation: 'Materiel',
    Unite: 4.0026,
    PU: 0,
    Total: `--------------------------------`,
  },
  {
    Qte: 3,
    Designation: 'Radiateur',
    Unite: 6.941,
    PU: 0,
    Total: `------------------------------------`,
  },
  {
    Qte: 4,
    Designation: 'Tuyuaux',
    Unite: 9.0122,
    PU: 0,
    Total: `-----------------------------------`,
  },
  {
    Qte: 5,
    Designation: "Main d'oeuvre",
    Unite: 10.811,
    PU: 0,
    Total: `-------------------------------`,
  },
  {
    Qte: 6,
    Designation: 'Installation',
    Unite: 12.0107,
    PU: 0,
    Total: `----------------------`,
  },
  {
    Qte: 7,
    Designation: 'Installation Sanitaire',
    Unite: 14.0067,
    PU: 0,
    Total: `-------------`,
  },
  {
    Qte: 8,
    Designation: 'douche rendu posé',
    Unite: 15.9994,
    PU: 0,
    Total: `--------------------`,
  }

];
