import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import { MenuButtonComponent } from './menu-button.component';
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import {By} from '@angular/platform-browser';
import {DropdownService} from '../dropdown/dropdown.service';
import {DropdownActions} from '../dropdown/dropdown.actions';

describe('MenuButtonComponent', () => {
  let component: MenuButtonComponent;
  let fixture: ComponentFixture<MenuButtonComponent>;
  let service: DropdownService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuButtonComponent ],
      imports: [
        NgReduxTestingModule
      ],
      providers: [ DropdownService, DropdownActions]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async(
    inject([DropdownService], (menu: DropdownService) => {
      service = menu;
    })
  ));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('set attributes', () => {

    let labelElem, inputElem;
    beforeEach(() => {
      labelElem = fixture.nativeElement.firstElementChild;
      inputElem = fixture.nativeElement.lastElementChild;
      component.inputId = 'some-id';
      component.classList = 'red';
      expect(labelElem.localName).toBe('label');
      expect(inputElem.localName).toBe('input');
      fixture.detectChanges();
    });

    it('should set appropriate attribute to children with given id', () => {
      expect(component.inputId).toBe('some-id-checkbox');
      expect(labelElem.htmlFor).toBe('some-id-checkbox');
      expect(inputElem.id).toBe('some-id-checkbox');
    });

    it('should set appropriate class to label element', () => {
      expect(labelElem.className).toContain('some-id-checkbox');
      expect(labelElem.className).toContain('red');
    });
  });

  describe('onInputClick()', () => {
    beforeEach(() => {
      component.inputId = 'some-id';
      component.classList = 'red';
      fixture.detectChanges();
    });
    it('should have called toggleDropdown($event)', fakeAsync(() => {
      const spy = spyOn(service, 'toggleDropdown');
      const inputButton = fixture.debugElement.query(By.css('#some-id-checkbox'))
      inputButton.triggerEventHandler('click', null);
      tick();
      expect(spy).toHaveBeenCalled();
    }));
  });
});
