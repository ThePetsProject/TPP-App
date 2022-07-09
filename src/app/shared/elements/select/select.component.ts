import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectOptions } from '../../interfaces/select-input';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input('controlName') controlName = '';
  @Input('label') label = '';
  @Input('selectOptionsData') selectOptionsData = [] as SelectOptions[];
  @Input('valid') valid = true;
  @Input() parent!: FormGroup;

  @Output() onChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  change() {
    this.onChange.emit(true);
  }
}
