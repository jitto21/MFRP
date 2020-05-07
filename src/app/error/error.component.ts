import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component } from '@angular/core';

@Component({
    templateUrl: './error.component.html'
})

export class ErrorComponent {
    constructor(public dialogRef: MatDialogRef<ErrorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { message: string }) { }

    onClose() {
        this.dialogRef.close();
    }
}