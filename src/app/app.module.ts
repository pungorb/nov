import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';

import {HomeModule} from './home/home.module';
import {MatPaginatorIntl} from '@angular/material/paginator';

import * as $ from 'jquery';
import {DROPZONE_CONFIG, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

const rootRouting: ModuleWithProviders<RouterModule> = RouterModule.forRoot([], {useHash: true});

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

window['$'] = $;
window['jQuery'] = $;

export const DEFAULT_DROPZONE_CONFIG_FOR_ANY_FILE: DropzoneConfigInterface = {
  url: 'http://pungorbence.hu',
  maxFilesize: 50,
  acceptedFiles: '*',
  clickable: true,
  maxFiles: 1,
  uploadMultiple: false,
  autoReset: null,
  errorReset: null,
  autoProcessQueue: false,
  autoQueue: false
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HomeModule,
    rootRouting,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    {provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG_FOR_ANY_FILE},
    {provide: MAT_DATE_LOCALE, useValue: 'hu-HU' }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
