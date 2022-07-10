import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsMapComponent } from './pets-map.component';

describe('PetsMapComponent', () => {
  let component: PetsMapComponent;
  let fixture: ComponentFixture<PetsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetsMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
