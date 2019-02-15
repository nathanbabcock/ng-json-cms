import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsForAddComponent } from './cms-for-add.component';

describe('CmsForAddComponent', () => {
  let component: CmsForAddComponent;
  let fixture: ComponentFixture<CmsForAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsForAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsForAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
