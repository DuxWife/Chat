import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-set-name-dialog',
  templateUrl: './set-name-dialog.component.html',
  styleUrls: ['./set-name-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SetNameDialogComponent implements OnInit {
  nameForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<SetNameDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {header: string}) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.dialogRef.close(this.nameForm.value.name);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
