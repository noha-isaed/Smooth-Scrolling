import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayEventsComponent } from './play-events.component';

describe('PlayEventsComponent', () => {
  let component: PlayEventsComponent;
  let fixture: ComponentFixture<PlayEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
