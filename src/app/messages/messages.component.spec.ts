// add necessary imports for the test suite
import { MessagesComponent } from './messages.component';
import { MessageService } from '../message.service';
// add imports for the testing environment
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// add a test suite for the messages component by mocking the message service
describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      providers: [
        { provide: MessageService, useValue: mockMessageService }
      ]
    });
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
  });

  // write a test case to check if the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the message when there is a message', () => {
    mockMessageService.messages = ['message1'];
    fixture.detectChanges();
    const messageElement = fixture.debugElement.query(By.css('div'));
    expect(messageElement.nativeElement.textContent).toContain('message1');
  });
});