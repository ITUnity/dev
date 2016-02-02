import {bootstrap} from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {HTTP_PROVIDERS} from 'angular2/http'
import {ValidationService} from './validation.service'
import {HashService} from './hash.service'

bootstrap(AppComponent, [HTTP_PROVIDERS, ValidationService, HashService])