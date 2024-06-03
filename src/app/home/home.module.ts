import { PortalModule } from '@angular/cdk/portal';
import {ModuleWithProviders, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MainComponent} from './main/main.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {AppModule} from '../app.module';
import { RegistrationComponent } from './registration/registration.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { LoginComponent } from './login/login.component';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { AuthService } from './shared/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';

const homeRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register/:encodedString',
    component: SetpasswordComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  }, 
  {
    path: '**',
    component: MainComponent
  }
]);

@NgModule({
  imports: [
    homeRouting,
    ReactiveFormsModule,
    PortalModule,
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDialogModule,
    NgxDropzoneModule,
    MatToolbarModule,
    FormsModule
  ],
  declarations: [
    MainComponent,
    RegistrationComponent,
    NavigationComponent,
    SetpasswordComponent,
    LoginComponent,
    ConfirmModalComponent
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
  ],
  entryComponents: [
  ]
})
export class HomeModule {}
