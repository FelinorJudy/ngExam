import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchingMovieComponent } from './watching-movie.component';

describe('WatchingMovieComponent', () => {
  let component: WatchingMovieComponent;
  let fixture: ComponentFixture<WatchingMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchingMovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchingMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
