import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessConfiguratorComponent } from './process-configurator.component';

describe('ProcessConfiguratorComponent', () => {
  let component: ProcessConfiguratorComponent;
  let fixture: ComponentFixture<ProcessConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessConfiguratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
