import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input('type') type = '';
  @Input('placeholder') placeholder = '';
  @Input('controlName') controlName = '';
  @Input() parent!: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
