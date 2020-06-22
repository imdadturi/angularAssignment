import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamdynamicComponent } from './iamdynamic.component';

describe('IamdynamicComponent', () => {
  let component: IamdynamicComponent;
  let fixture: ComponentFixture<IamdynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamdynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamdynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
