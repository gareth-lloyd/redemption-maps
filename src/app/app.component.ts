import { Component, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(public dialog: MatDialog) { }

  ngAfterViewInit() {
    //let dialogRef = this.dialog.open(IntroDialog, {width: '500px'});

    //dialogRef.afterClosed().subscribe(result => {
    //});
  }

}

@Component({
  templateUrl: 'intro-dialog.html',
})
export class IntroDialog {

  constructor(public dialogRef: MatDialogRef<IntroDialog>) { }

}
