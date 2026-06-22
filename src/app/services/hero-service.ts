import { Injectable , inject } from "@angular/core";
import { IHero } from "../models";
import { MessageService } from "./message-service";
import { catchError, Observable , of } from 'rxjs';
import { HttpClient , HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class HeroService{
  private readonly messageService = inject(MessageService);
  private readonly http = inject(HttpClient);

  private readonly heroesUrl = 'api/heroes';

  private readonly httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getHeroes(): Observable<IHero[]>{
        this.log("fetched heroes");
        return this.http.get<IHero[]>(this.heroesUrl).pipe(
            catchError(this.handleError<IHero[]>('getHeroes' , []))
        );
    }

    getHero(id: number): Observable<IHero>{
        this.log("fetched single hero");
        return this.http.get<IHero>(`${this.heroesUrl}/${id}`).pipe(
            catchError(this.handleError<IHero>(`getHero id=${id}`))
        );
    }

    updateHero(hero: IHero): Observable<any> {
        this.log(`Updated hero ${hero.id}`);
        return this.http.put(this.heroesUrl , hero , this.httpOptions).pipe(
            catchError(this.handleError<any>('updateHero'))
        );
    }

    addHero(hero: IHero): Observable<IHero>{
        this.log(`Added hero ${hero.name}`);
        return this.http.post<IHero>(this.heroesUrl , hero , this.httpOptions).pipe(
            catchError(this.handleError<IHero>('addHero'))
        );
    }

    deleteHero(id: number): Observable<IHero>{
        this.log(`Deleted hero ${id}`);
        return this.http.delete<IHero>(`${this.heroesUrl}/${id}` , this.httpOptions).pipe(
            catchError(this.handleError<IHero>(`deleteHero id=${id}`))
        );
    }

    searchHeroes(name: string): Observable<IHero[]>{
        if(!name.trim()){
            return of([]);
        }
        this.log(`Searching for ${name}`);
        return this.http.get<IHero[]>(`${this.heroesUrl}/?name=${name}`).pipe(
          catchError(this.handleError<IHero[]>(`search by ${name}`, [])),
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }


    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}