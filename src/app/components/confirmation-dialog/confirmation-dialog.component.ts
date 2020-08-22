import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  @Input()
  title: string;

  @Input()
  content: string[];

  constructor(private activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.close(false);
  }

  confirm(): void {
    this.activeModal.close(true);
  }
}
