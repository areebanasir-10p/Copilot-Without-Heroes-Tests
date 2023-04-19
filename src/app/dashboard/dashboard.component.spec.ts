// add necessary imports for the dashboard component
import { DashboardComponent } from './dashboard.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
// add imports for the testing environment
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Hero } from '../hero';

// declare mock hero data of type Hero with 3 heroes
const mockHeroes: Hero[] = [
  { id: 1, name: 'SuperDude' },
];


// add a describe block for the dashboard component and mock the hero service
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;

  beforeEach(() => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeroSearchComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: HeroService, useValue: heroServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    heroServiceSpy.getHeroes.and.returnValue(of(mockHeroes));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Heroes" as headline', () => {
    const headline = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(headline.textContent).toEqual('Top Heroes');
  });

  it('should call heroService', () => {
    component.getHeroes();
    expect(heroServiceSpy.getHeroes.calls.any()).toBe(true, 'getHeroes called');
  });

  it('should not display any heroes', () => {
    const heroElements = fixture.debugElement.queryAll(By.css('a'));
    expect(heroElements.length).toBe(0, 'should not display any heroes');
  });
});
