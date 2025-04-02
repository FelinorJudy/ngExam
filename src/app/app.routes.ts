import { Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { DestinationComponent } from './components/destination/destination.component';


export const routes: Routes = [
    {path: 'testPage', component: TestComponent},
    {path: 'destinationPage', component: DestinationComponent}
];