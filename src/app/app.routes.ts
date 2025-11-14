import { Routes } from '@angular/router';
import { PokemonsComponentTs } from './pokemons/list-pokemons/pokemons.component';
import { DetailPokemonComponent } from './pokemons/detail-pokemon/detail-pokemon.component';
import { EditPokemonComponent } from './pokemons/edit-pokemon/edit-pokemon.component';
import { LoginComponent } from './auth/login/login.component';
import { AddPokemonComponent } from './pokemons/add-pokemon/add-pokemon.component';
import { authGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'pokemon/all', pathMatch: 'full' },
  { path: 'pokemon/all', canActivate: [authGuard] ,loadComponent: () =>  PokemonsComponentTs },
  { path: 'pokemon/:id', canActivate: [authGuard], loadComponent: () => DetailPokemonComponent },
  { path: 'pokemon/edit/:id', canActivate: [authGuard], loadComponent: () => EditPokemonComponent },
  { path: 'pokemons/add', canActivate: [authGuard],loadComponent: () => AddPokemonComponent},
  { path: '**', component: NotFoundComponent }
];
