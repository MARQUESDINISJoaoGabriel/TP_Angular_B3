import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PokemonTypeColor } from '../pipes/pokemon-type-color.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { FormPokemonComponent } from "./form-pokemon.component";
import { PokemonsService } from '../pokemons.service';

@Component({
  standalone: true,
  selector: 'edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  imports: [
    CommonModule,
    FormPokemonComponent
]
})
export class EditPokemonComponent implements OnInit{
  
  pokemon: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonsService: PokemonsService){
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.pokemonsService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
  }

}