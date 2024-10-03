import { Component, OnInit } from '@angular/core';
import { ModuleFacade } from '../../store/module.facade';
import { Observable } from 'rxjs';
import { Page } from '../../models/Page.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {

  currentPage$: Observable<number>;
  pagesInformation$: Observable<Page[]>;

  exerciseOneQuestions = ['1 x 1', '2 x 2', '3 x 2', '2 x 4', '5 x 5'];
  exerciseTwoQuestions = ['10 / 5', '11 x 6', '7 x 4', '30 / 6', '8 x 8'];
  exerciseThreeQuestions = ['16 x 5', '69 / 3', '33 x 4', '45 / 3', '51 x 5'];
  exerciseFourQuestions = ['100 / 5', '19 x 6', '71 x 4', '310 / 5', '81 x 8'];
  exerciseFiveQuestions = ['945 x 2', '968 / 4', '126 / 3', '56 x 11', '909 / 3'];

  constructor(private moduleFacade: ModuleFacade) {
    this.currentPage$ = this.moduleFacade.currentPage$;
    this.pagesInformation$ = this.moduleFacade.pagesInformation$;
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.moduleFacade.refreshUser(userId || '0')
  }

}
