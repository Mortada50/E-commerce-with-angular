import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CoreModule } from './core/core-module';
import { SharedModule } from './shared/shared-module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ShopModule } from './shop/shop-module';
import { Home } from './home/home';

@NgModule({
  declarations: [App, Home],
  imports: [BrowserModule, AppRoutingModule, CoreModule, ShopModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }), // ← هذا هو الحل الجوهري
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()), // withFetch مطلوب مع SSR
  ],
  bootstrap: [App],
})
export class AppModule {}
