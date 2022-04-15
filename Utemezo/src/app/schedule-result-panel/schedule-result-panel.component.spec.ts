import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleResultPanelComponent } from './schedule-result-panel.component';

describe('ScheduleResultPanelComponent', () => {
  let component: ScheduleResultPanelComponent;
  let fixture: ComponentFixture<ScheduleResultPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleResultPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleResultPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
