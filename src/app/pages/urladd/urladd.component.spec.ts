import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrladdComponent } from './urladd.component';

describe('UrladdComponent', () => {
  let component: UrladdComponent;
  let fixture: ComponentFixture<UrladdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrladdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UrladdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
