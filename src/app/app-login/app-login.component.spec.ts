import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoginComponent } from './app-login.component';
import { AuthConfig, OAuthModule } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { authConfig } from '../app.module';

describe('AppLoginComponent', () => {
  let component: AppLoginComponent;
  let fixture: ComponentFixture<AppLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OAuthModule.forRoot({resourceServer: {sendAccessToken: true}}),
        MatIconModule
      ],
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpy('httpClient')
        },
        {
          provide: AuthConfig,
          useValue: authConfig
        }
      ],

      declarations: [ AppLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
