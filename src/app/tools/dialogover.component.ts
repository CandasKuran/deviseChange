import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  Designation: string;
}
@Component({
  selector: 'dialog-comp',
  templateUrl: 'dialogover.component.html',
  styleUrls:["dialogover.component.css"]
})
export class DialogoverComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
