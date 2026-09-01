import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsPublicComponent } from './publications-public.component';

describe('PublicationsPublicComponent', () => {
  let component: PublicationsPublicComponent;
  let fixture: ComponentFixture<PublicationsPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicationsPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationsPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
