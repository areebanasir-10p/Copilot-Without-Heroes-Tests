// add necessary imports for the test
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { RouterTestingModule } from '@angular/router/testing';

// create mock hero data with 5 heroes with real names
const HEROES: Hero[] = [
  { id: 1, name: 'Test1' },
  { id: 2, name: 'Test2' },
  { id: 3, name: 'Test3' },
  { id: 4, name: 'Test4' },
  { id: 5, name: 'Test5' }
];

// add a describe block for the component and mock the hero service
describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: jasmine.SpyObj<HeroService>;

  beforeEach(() => {
    // mock the hero service
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHero', 'deleteHero']);
    heroService.getHeroes.and.returnValue(of([HEROES[0], HEROES[1]]));
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroDetailComponent],
      imports: [FormsModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: HeroService, useValue: heroService }]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "My Heroes" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('My Heroes');
  });

  it('should display 2 links', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(2);
  });

  it('should call heroService', () => {
    fixture.detectChanges();
    expect(heroService.getHeroes.calls.any()).toBe(true);
  });

  it('should call heroService.addHero', () => {
    heroService.addHero.and.returnValue(of(HEROES[2]));
    fixture.detectChanges();
    component.add('Test3');
    expect(heroService.addHero.calls.any()).toBe(true);
  });

  // write a test case for the add() method that pass empty string to the method
  it('should not call heroService.addHero', () => {
    heroService.addHero.and.returnValue(of(HEROES[2]));
    fixture.detectChanges();
    component.add('');
    expect(heroService.addHero.calls.any()).toBe(false);
  });

  it('should call heroService.deleteHero', () => {
    heroService.deleteHero.and.returnValue(of());
    fixture.detectChanges();
    component.delete(HEROES[0]);
    expect(heroService.deleteHero.calls.any()).toBe(true);
  });

  it('should call heroService.deleteHero with the correct hero', () => {
    heroService.deleteHero.and.returnValue(of());
    fixture.detectChanges();
    component.delete(HEROES[0]);
    expect(heroService.deleteHero).toHaveBeenCalledWith(HEROES[0].id);
  });

  it('should call heroService.deleteHero with the correct hero', () => {
    heroService.deleteHero.and.returnValue(of());
    fixture.detectChanges();
    component.delete(HEROES[0]);
    expect(heroService.deleteHero).toHaveBeenCalledWith(HEROES[0].id);
  });

  it('should call heroService.deleteHero with the correct hero', () => {
    heroService.deleteHero.and.returnValue(of());
    fixture.detectChanges();
    component.delete(HEROES[0]);
    expect(heroService.deleteHero).toHaveBeenCalledWith(HEROES[0].id);
  });
});
