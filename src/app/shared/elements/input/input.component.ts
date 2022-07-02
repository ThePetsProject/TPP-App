import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input('type') type = '';
  @Input('placeholder') placeholder = '';
  @Input('controlName') controlName = '';
  @Input('label') label = '';
  @Input('valid') valid = true;
  @Input() parent!: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
