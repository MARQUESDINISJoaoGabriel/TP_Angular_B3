import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../donnees-pokemons/pokemon';
import { CommonModule, DatePipe } from '@angular/common';
import { BorderCardDirective } from '../directives/border-card.directive';
import { PokemonTypeColor } from '../pipes/pokemon-type-color.pipe';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import { SearchPokemonComponent } from '../search-pokemon/search-pokemon.component';
import { RarityColorDirective } from '../directives/rarity-color.directive';

@Component({
  standalone: true,
  selector: 'list-pokemons',
  imports: [
    CommonModule, // pour utiliser ngIf et ngFor
    DatePipe,
    FormsModule,
    BorderCardDirective,
    PokemonTypeColor,
    SearchPokemonComponent,
    RarityColorDirective  
  ],
  templateUrl: './pokemons.component.html',
})
export class PokemonsComponentTs implements OnInit {
  
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[] = [];
  filterRarity: number = 0;

  constructor(private router: Router, private pokemonService: PokemonsService){
    this.pokemons = [];
  }

  ngOnInit(): void {
    
    this.pokemonService.getPokemons().subscribe(pokemons => this.pokemons = pokemons);
    console.log('Pokémons reçus:', this.pokemons);

    this.pokemonService.getPokemons().subscribe(p => {
    this.pokemons = p;
    this.applyFilters();
  });
  }

  selectPokemon(pokemon: Pokemon){
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
  
  applyFilters() {
  this.filteredPokemons = this.pokemons.filter(p => {
    if (this.filterRarity && p.rarity !== this.filterRarity) return false;
    return true;
  });
}

  goAddPokemon() {
    this.router.navigate(['/pokemons/add']); // ou '/add-pokemon' selon ta route d’ajout
  }

  exportFiltered() {
  const data = JSON.stringify(this.filteredPokemons, null, 2); // données joliment formatées
  const blob = new Blob([data], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'pokemons-export.json';
  a.click();

  window.URL.revokeObjectURL(url);
}

}
