import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input('formTitle') formTitle = '' as string;
  @Input() buttonLabel = 'ENVIAR';
  @Input() cancelButtonLabel = 'CANCELAR';
  @Input() errorMessage!: string;
  @Input() submitFn!: (args?: any) => void;
  @Input() cancelButtonFn!: (args?: any) => void;
  @Input() modalFn!: (args?: any) => void;
  @Input() form!: FormGroup;
  @Input() success!: boolean;
  @Input() cancelButton = false;
  @Input() isModal = false;
  @Input() extraClasses = 'w-2/5';
  @Input() showRecoverPwd = false;

  @Output() onOpenModal = new EventEmitter<boolean>();
  @Output() onCloseModal = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  submit(args?: any) {
    this.submitFn(args);
  }

  closeModal() {
    this.onCloseModal.emit(false);
  }

  openModal() {
    this.onOpenModal.emit(true);
  }
}
