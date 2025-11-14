import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../donnees-pokemons/pokemon';
import { CommonModule, DatePipe } from '@angular/common';
import { PokemonTypeColor } from '../pipes/pokemon-type-color.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import { RarityStarsPipe } from '../pipes/rarity-stars.pipe';

@Component({
  standalone: true,
  selector: 'detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  imports: [
    CommonModule,
    DatePipe,
    PokemonTypeColor,
    RarityStarsPipe
  ],
  
})
export class DetailPokemonComponent implements OnInit{
  
  pokemon: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonsService: PokemonsService){
  }

  ngOnInit(): void {
  
  let id = this.route.snapshot.params['id'];
  this.pokemonsService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);

  }

  goAll():void{
    this.router.navigate(['/pokemon/all']);
  }

  goNext(pokemon: Pokemon){
    let nextId = pokemon.id +1;
    window.location.href = '/pokemon/'+ nextId;
    // let link = ['/pokemon', nextId]
    // this.router.navigate(link);
  }

  goBack(pokemon: Pokemon){
    let backId = pokemon.id - 1;
    window.location.href = '/pokemon/'+ backId;
    // let link = ['/pokemon', backId]
    // this.router.navigate(link);
  }

  goEdit(pokemon: Pokemon){
    let link = ['/pokemon/edit', pokemon.id]
    this.router.navigate(link);
  }

  goDelete(pokemon: Pokemon){
    this.pokemonsService.deletePokemon(this.pokemon).subscribe( () => {
      this.router.navigate(['/pokemon/all'])
    })

  }

}