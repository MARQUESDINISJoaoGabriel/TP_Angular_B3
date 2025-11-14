import { Injectable } from "@angular/core";
import { Pokemon } from "./donnees-pokemons/pokemon";
import { POKEMONS } from "./donnees-pokemons/mock-pokemons";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { catchError, Observable, of, tap } from "rxjs";


@Injectable( { providedIn: 'root' })
export class PokemonsService{
  constructor(private http: HttpClient){}

  private pokemonsUrl = 'api/pokemons';

  private handleError<T>(operation="operation", result?: T ){
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed : ${error.message}`);

      return of(result as T);
    };

  }

  private log(log: string){
    console.info(log);
  }

  getPokemons(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      tap(_ => this.log('fetched pokemons')),
      catchError(this.handleError('getPokemons', []))
    )
  }
  
  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`;

      return this.http.get<Pokemon>(url).pipe(
        tap(_ => this.log(`fetched pokemon id=${id}`)),
        catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
      );
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type' : 'application/json'})
    };

    return this.http.put<Pokemon>(this.pokemonsUrl, pokemon, httpOptions).pipe(
        tap(_ => this.log(`updated pokemon id=${pokemon.id}`)),
        catchError(this.handleError<Pokemon>(`updatePokemon id=${pokemon.id}`))
      );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    };

    return this.http.post<Pokemon>(this.pokemonsUrl, pokemon, httpOptions).pipe(
      tap((newPokemon: Pokemon) => this.log(`added pokemon w/ id=${newPokemon.id}`)),
      catchError(this.handleError<Pokemon>('addPokemon'))
    );
  }

  deletePokemon(pokemon: Pokemon): Observable<Pokemon>{ 
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type' : 'application/json'})
    };
    const url = `${this.pokemonsUrl}/${pokemon.id}`;

    return this.http.delete<Pokemon>(url, httpOptions).pipe(
        tap(_ => this.log(`delete pokemon id=${pokemon.id}`)),
        catchError(this.handleError<Pokemon>(`deletePokemon id=${pokemon.id}`))
      );
  }

  getPokemonTypes(): string[]{
    return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol'];
  }

  
  searchPokemons(term: string): Observable<Pokemon[]>{
    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found pokemons matching "${term}`)),
    catchError(this.handleError<Pokemon[]>('searchPokemons', []))
  );
  }
}
