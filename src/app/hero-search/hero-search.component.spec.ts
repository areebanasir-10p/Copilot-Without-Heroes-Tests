//add imports for hero search component spec file
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { HeroSearchComponent } from './hero-search.component';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let searchHeroesSpy: jasmine.Spy;
  beforeEach(waitForAsync(() => {
    heroService = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    searchHeroesSpy = heroService.searchHeroes.and.returnValue(of(HEROES));

    TestBed
      .configureTestingModule({
        declarations: [HeroSearchComponent],
        imports: [FormsModule, RouterTestingModule.withRoutes([])],
        providers: [{ provide: HeroService, useValue: heroService }]
      })
      .compileComponents();
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  //write test case for ngOnInit method of hero search component
  it('should call heroService', fakeAsync(() => {
    component['searchTerms'].next('A');
    tick(300);
    expect(searchHeroesSpy.calls.any()).toBe(true);
  }
  ));

  //write test case for search method of hero search component
  it('should call search method', fakeAsync(() => {
    const spy = spyOn(component.searchTerms, 'next');
    component.search('A');
    expect(spy).toHaveBeenCalledWith('A');
  }
  ));

});



