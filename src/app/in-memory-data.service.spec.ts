// add necessary imports for the test suite
import { InMemoryDataService } from './in-memory-data.service';
import { Hero } from './hero';
// add imports for the testing environment
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

let heroes = [
  { id: 12, name: 'Dr. Nice' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr. IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

// add a describe block for the in-memory-data service
fdescribe('InMemoryDataService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InMemoryDataService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(InMemoryDataService);
  });

  // write a test case to check if the service is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // write a test case for the createDb method and check if it returns the heroes array
  it('should return the heroes array', () => {
    expect(service.createDb()).toEqual({ heroes });
  });

  // write a test case for the genId method and check if it returns the highest hero id + 1
  it('should return the highest hero id + 1', () => {
    expect(service.genId(heroes)).toEqual(21);
  });

  // write a test case for the genId method and check if it returns 11 when the heroes array is empty
  it('should return 11 when the heroes array is empty', () => {
    expect(service.genId([])).toEqual(11);
  });
});

