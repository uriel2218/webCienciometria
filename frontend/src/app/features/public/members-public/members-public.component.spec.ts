import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersPublicComponent } from './members-public.component';

describe('MembersPublicComponent', () => {
  let component: MembersPublicComponent;
  let fixture: ComponentFixture<MembersPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
