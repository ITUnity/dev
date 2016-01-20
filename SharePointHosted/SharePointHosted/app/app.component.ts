import {Welcome} from './app.module'
import {Component} from 'angular2/core'

@Component({
    selector: 'app-main',
    template: `<h1>${Welcome.getMessage()}</h1>`
})

export class AppComponent { }