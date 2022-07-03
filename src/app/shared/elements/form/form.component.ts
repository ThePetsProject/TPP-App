import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input('formTitle') formTitle = '' as string;
  @Input() buttonLabel = 'ENVIAR';
  @Input() errorMessage!: string;
  @Input() submitFunc!: (args?: any) => void;
  @Input() form!: FormGroup;
  @Input() success!: boolean;
  @Input() widthClass = 'w-2/5';

  constructor() {}

  ngOnInit(): void {}

  submit(args?: any) {
    this.submitFunc(args);
  }
}
