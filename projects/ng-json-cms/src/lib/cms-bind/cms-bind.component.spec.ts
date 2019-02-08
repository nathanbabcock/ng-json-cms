import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsBindComponent } from './cms-bind.component';

describe('CmsBindComponent', () => {
  let component: CmsBindComponent;
  let fixture: ComponentFixture<CmsBindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsBindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsBindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
