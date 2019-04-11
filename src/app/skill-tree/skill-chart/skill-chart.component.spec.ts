import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillChartComponent } from './skill-chart.component';

describe('SkillChartComponent', () => {
  let component: SkillChartComponent;
  let fixture: ComponentFixture<SkillChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
