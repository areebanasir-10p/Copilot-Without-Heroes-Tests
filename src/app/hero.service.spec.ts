// add necessary imports for hero service spec file

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHero', () => {
    it('should return expected hero (called once)', () => {
      const expectedHero = { id: 1, name: 'A' };
      service.getHero(1).subscribe(hero => {
        expect(hero).toEqual(expectedHero, 'should return expected hero');
      });

      const req = httpTestingController.expectOne('api/heroes/1');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedHero);
    });

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  //write test case on getHeroes method
  describe('getHeroes', () => {
    it('should return expected heroes (called once)', () => {
      const expectedHeroes = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
      service.getHeroes().subscribe(heroes => {
        expect(heroes).toEqual(expectedHeroes, 'should return expected heroes');
      });

      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedHeroes);
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  //write test case on getHeroNo404 method
  describe('getHeroNo404', () => {
    it('should return expected hero when hero is found', () => {
      const expectedHero = { id: 1, name: 'A' };
      service.getHeroNo404(1).subscribe(hero => {
        expect(hero).toEqual(expectedHero, 'should return expected hero');
      });

      const req = httpTestingController.expectOne('api/heroes/?id=1');
      expect(req.request.method).toEqual('GET');

      req.flush([expectedHero]);
    });

    //write test case for getHeroNo404 method to return undefined when hero is not found
    it('should return undefined when hero is not found', () => {
      service.getHeroNo404(1).subscribe(hero => {
        expect(hero).toBeUndefined();
      });

      const req = httpTestingController.expectOne('api/heroes/?id=1');
      expect(req.request.method).toEqual('GET');

      req.flush([]);
    });

  });

  afterEach(() => {
    httpTestingController.verify();
  }
  );


  //write test case on searchHeroes method
  describe('searchHeroes', () => {
    it('should return expected heroes (called once)', () => {
      const expectedHeroes = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
      service.searchHeroes('A').subscribe(heroes => {
        expect(heroes).toEqual(expectedHeroes, 'should return expected heroes');
      });

      const req = httpTestingController.expectOne('api/heroes/?name=A');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedHeroes);
    });

    //write test case for searchHeroes method to return empty array when string is not trimmed
    it('should return empty array when string is not trimmed', () => {
      service.searchHeroes('  ').subscribe(heroes => {
        expect(heroes).toEqual([], 'should return expected heroes');
      });
    });

    //write test case for searchHeroes method when no heroes are found
    it('should return empty array when no heroes are found', () => {
      service.searchHeroes('A').subscribe(heroes => {
        expect(heroes).toEqual([], 'should return expected heroes');
      });

      const req = httpTestingController.expectOne('api/heroes/?name=A');
      expect(req.request.method).toEqual('GET');

      req.flush([]);

    });

  });

  afterEach(() => {
    httpTestingController.verify();
  }
  );

  //write test case on addHero method
  describe('addHero', () => {
    it('should return expected hero (called once)', () => {
      const expectedHero = { id: 1, name: 'A' };
      service.addHero(expectedHero).subscribe(hero => {
        expect(hero).toEqual(expectedHero, 'should return expected hero');
      });

      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('POST');

      req.flush(expectedHero);
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  }
  );

  //write test case on deleteHero method
  describe('deleteHero', () => {
    it('should return expected hero (called once)', () => {
      const expectedHero = { id: 1, name: 'A' };
      service.deleteHero(expectedHero.id).subscribe(hero => {
        expect(hero).toEqual(expectedHero, 'should return expected hero');
      });

      const req = httpTestingController.expectOne('api/heroes/1');
      expect(req.request.method).toEqual('DELETE');

      req.flush(expectedHero);
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  }
  );

  //write test case on updateHero method
  describe('updateHero', () => {
    it('should return expected hero (called once)', () => {
      const expectedHero = { id: 1, name: 'A' };
      service.updateHero(expectedHero).subscribe(hero => {
        expect(hero).toEqual(expectedHero, 'should return expected hero');
      });

      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('PUT');

      req.flush(expectedHero);
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});

