import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrimopianoPage } from './primopiano.page';

describe('PrimopianoPage', () => {
  let component: PrimopianoPage;
  let fixture: ComponentFixture<PrimopianoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimopianoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrimopianoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
