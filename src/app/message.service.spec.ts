//add imports for message service spec file
import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('add', () => {
    it('should add message', () => {
      service.add('test message');
      expect(service.messages.length).toBe(1);
    });
  });

  describe('clear', () => {
    it('should clear messages', () => {
      service.add('test message');
      service.clear();
      expect(service.messages.length).toBe(0);
    });
  });
});
