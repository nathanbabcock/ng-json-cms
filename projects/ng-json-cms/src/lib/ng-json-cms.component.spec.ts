import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgJsonCmsComponent } from './ng-json-cms.component';

describe('NgJsonCmsComponent', () => {
  let component: NgJsonCmsComponent;
  let fixture: ComponentFixture<NgJsonCmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgJsonCmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgJsonCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
