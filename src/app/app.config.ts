import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';

import Aura from '@primeuix/themes/aura';
import { provideHttpClient } from '@angular/common/http';
// import Lara from '@primeuix/themes/lara'; TEMA LARA

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(),
    providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                  darkModeSelector: false || 'none'
                }
                // preset: Lara
            }
        })
  ]
};
