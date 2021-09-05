import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { fakeBackendProvider } from './core/services/fake-backend';
import { AccountService } from './core/services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateAccountComponent } from './pages/account/create-account/create-account.component';
import { EditAccountComponent } from './pages/account/edit-account/edit-account.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    TableComponent,
    DashboardComponent,
    CreateAccountComponent,
    EditAccountComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    // provider used to create fake backend,
    AccountService,
    fakeBackendProvider,
  ],
})
export class AppModule {}
