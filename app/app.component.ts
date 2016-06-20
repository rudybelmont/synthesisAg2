import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { DashboardComponent } from './dashboard.component';
import { MaterialsComponent } from './material.component';
import { MaterialDetailComponent } from './material-detail.component';
import { SynthesisItemService } from './services/synthesisItem.service';
import { SynthesisMaterialService } from './services/synthesisMaterial.service';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Material']">Material</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/css/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    SynthesisItemService,
    SynthesisMaterialService
  ]
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'MaterialDetail',
    component: MaterialDetailComponent
  },
  {
    path: '/material',
    name: 'Material',
    component: MaterialsComponent
  }
])
export class AppComponent {
  title = 'Material Recipe';
}
