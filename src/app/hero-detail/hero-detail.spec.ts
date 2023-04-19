// add necessary imports for the hero-detail component
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
// add imports for the testing environment
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

// add a test suite for the hero-detail component by mocking the hero service and the activated route
describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockActivatedRoute;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => { return '3'; } } }
    };

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude' }));
  });

  it('should render hero name in an h2 tag', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

  // write a test case for the getHero method and check the id is returned from the activated route
  it('should call getHero when ngOnInit is called', () => {
    fixture.detectChanges();
    expect(mockHeroService.getHero).toHaveBeenCalledWith(3);
  });

  // write a test case for the goBack method and check the location back method is called
  it('should call goBack when the back button is clicked', () => {
    fixture.detectChanges();
    const backButton = fixture.debugElement.query(By.css('button'));
    backButton.triggerEventHandler('click', null);
    expect(mockLocation.back).toHaveBeenCalled();
  });

  // write a test case for the save method and check the updateHero method is not called when the hero is undefined
  it('should not call updateHero when save is called and hero is undefined', () => {
    component.hero = undefined;
    component.save();
    expect(mockHeroService.updateHero).not.toHaveBeenCalled();
  });

  it('should call updateHero when save is called', () => {
    component.hero = { id: 3, name: 'SuperDude' };
    mockHeroService.updateHero.and.returnValue(of({}));
    component.save();
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  });
});

