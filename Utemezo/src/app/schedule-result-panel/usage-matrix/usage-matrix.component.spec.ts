import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagrammingMatrixComponent } from './usage-matrix.component';

describe('GanndiagramMatrixComponent', () => {
  let component: DiagrammingMatrixComponent;
  let fixture: ComponentFixture<DiagrammingMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagrammingMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagrammingMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
