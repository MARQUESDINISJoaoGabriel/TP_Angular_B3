import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PokemonsService } from "../pokemons.service";
import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {Pokemon} from "../donnees-pokemons/pokemon";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'search-pokemon',
  templateUrl: './search-pokemon.component.html',
  imports: [CommonModule, FormsModule] 
})
export class SearchPokemonComponent implements OnInit{

  private searchTerms = new Subject<string>();
  pokemons!: Observable<Pokemon[]>;

  constructor(
    private pokemonService: PokemonsService,
    private router: Router) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.pokemons = this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => this.pokemonService.searchPokemons(term)),
    );
  }

  gotoDetail(pokemon: Pokemon): void {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

}
