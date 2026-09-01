import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsPublicComponent } from './events-public.component';

describe('EventsPublicComponent', () => {
  let component: EventsPublicComponent;
  let fixture: ComponentFixture<EventsPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
