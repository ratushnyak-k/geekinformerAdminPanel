import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';

import { AppComponent } from './components/app';

bootstrap(AppComponent, [HTTP_PROVIDERS]);
