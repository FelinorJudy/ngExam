import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedMoviesComponent } from './watched-movies.component';

describe('WatchedMoviesComponent', () => {
  let component: WatchedMoviesComponent;
  let fixture: ComponentFixture<WatchedMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchedMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
