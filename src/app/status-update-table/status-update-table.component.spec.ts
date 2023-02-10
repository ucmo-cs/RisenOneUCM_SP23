import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusUpdateTableComponent } from './status-update-table.component';

describe('StatusUpdateTableComponent', () => {
  let component: StatusUpdateTableComponent;
  let fixture: ComponentFixture<StatusUpdateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusUpdateTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusUpdateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
