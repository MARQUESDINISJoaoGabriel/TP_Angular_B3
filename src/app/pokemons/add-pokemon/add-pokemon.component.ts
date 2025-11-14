import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import { Pokemon } from '../donnees-pokemons/pokemon';
import { FormPokemonComponent } from '../edit-pokemon/form-pokemon.component';

@Component({
  standalone: true,
  selector: 'add-pokemon',
  templateUrl: 'add-pokemon.component.html',
  imports: [FormPokemonComponent]
})
export class AddPokemonComponent {

  pokemon: Pokemon = {
    id: 0,
    name: '',
    hp: 0,
    cp: 0,
    picture: '',
    types: [],
    rarity: 1,
    created: new Date()
  };

  constructor(
    private service: PokemonsService,
    private router: Router
  ) {}

  createPokemon(newPokemon: Pokemon) {
    this.service.addPokemon(newPokemon).subscribe(() => {
      this.router.navigate(['/pokemon/all']);
    });
  }
}
