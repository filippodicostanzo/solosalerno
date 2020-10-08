import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CampionatoPage } from './campionato.page';

describe('CampionatoPage', () => {
  let component: CampionatoPage;
  let fixture: ComponentFixture<CampionatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampionatoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CampionatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
