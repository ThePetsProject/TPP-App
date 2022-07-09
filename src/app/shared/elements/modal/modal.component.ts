import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() show = false;

  @Output() onCloseModal = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.onCloseModal.emit(false);
  }
}
