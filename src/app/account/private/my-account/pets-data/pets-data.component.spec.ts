import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsDataComponent } from './pets-data.component';

describe('PetsDataComponent', () => {
  let component: PetsDataComponent;
  let fixture: ComponentFixture<PetsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
