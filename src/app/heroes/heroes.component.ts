import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Hero } from './hero';
import { HeroesService } from './heroes.service';

/*importing behaviorsubject as a test for exporting data to data-table*/
import { BehaviorSubject } from 'rxjs'; 

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  providers: [HeroesService],
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroString = " ";
  heroes: Hero[] = [];
  editHero: Hero | undefined; // the hero currently being edited
  heroName = '';

  private messageSource = new BehaviorSubject<string>("test message");
  currentMessage = this.messageSource.asObservable();

  constructor(private heroesService: HeroesService) {}

  @ViewChild('heroEditInput')
  set heroEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  ngOnInit() {
    this.getHeroes();
  }
/* data function logs out the type for this.heroes */
  getHeroes(): void {
    this.heroesService.getHeroes()
    .subscribe(heroes => (this.heroes = heroes));
    console.log(this.heroes);
    //this.heroes = JSON.parse(this.heroString);
  }
  heroesMessage(message : string){
    this.messageSource.next(message);
  }
  add(name: string): void {
    this.editHero = undefined;
    name = name.trim();
    if (!name) {
      return;
    }

    // The server will generate the id for this new hero
    const newHero: Hero = { name } as Hero;
    this.heroesService
      .addHero(newHero)
      .subscribe(hero => this.heroes.push(hero));
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroesService
      .deleteHero(hero.id)
      .subscribe();
    /*
    // oops ... subscribe() is missing so nothing happens
    this.heroesService.deleteHero(hero.id);
    */
  }

  edit(heroName: string) {
    this.update(heroName);
    this.editHero = undefined;
  }

  search(searchTerm: string) {
    this.editHero = undefined;
    if (searchTerm) {
      this.heroesService
        .searchHeroes(searchTerm)
        .subscribe(heroes => (this.heroes = heroes));
    } else {
      this.getHeroes();
    }
  }

  update(heroName: string) {
    if (heroName && this.editHero && this.editHero.name !== heroName) {
      this.heroesService
        .updateHero({...this.editHero, name: heroName})
        .subscribe(hero => {
        // replace the hero in the heroes list with update from server
        const ix = hero ? this.heroes.findIndex(h => h.id === hero.id) : -1;
        if (ix > -1) {
          this.heroes[ix] = hero;
        }
      });
      this.editHero = undefined;
    }
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
