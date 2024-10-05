import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModuleFacade } from '../../store/module.facade';
import { Observable, Subject, take, takeLast, takeUntil } from 'rxjs';
import { Question } from '../../models/Question.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss'
})
export class ExerciseComponent implements OnInit, OnDestroy {
  @Input() disabled: boolean = false;
  @Input() questions: string[] = ['1 x 1', '2 x 2', '3 x 2', '2 x 4', '5 x 5'];
  @Input() newQuestions: any = [
    { key: "1", value: "1 x 1" },
    { key: "2", value: "2 x 2" },
    { key: "3", value: "3 x 3" },
    { key: "4", value: "4 x 4" },
    { key: "5", value: "5 x 5" },
  ]
  @Input() exerciseNumber: number = 1;
  specificExerciseQuestions$: Observable<Question[]> | undefined;
  form!: FormGroup;
  formControlName:string = 'answer'+ this.exerciseNumber;
  private destroy$ = new Subject<void>();

  constructor(private moduleFacade: ModuleFacade, private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    this.moduleFacade.questionsOfExercise(this.exerciseNumber).pipe(takeUntil(this.destroy$)).subscribe(questions => {
      if (questions) {
        const answers = questions.map(question => question?.currentAnswer);
        if (answers) {
          this.form.get('answer1')?.patchValue(answers[0]);
          this.form.get('answer2')?.patchValue(answers[1]);
          this.form.get('answer3')?.patchValue(answers[2]);
          this.form.get('answer4')?.patchValue(answers[3]);
          this.form.get('answer5')?.patchValue(answers[4]);
        }
      }
    })
    // this.specificExerciseQuestions$ = this.moduleFacade.questionsOfExercise(this.exerciseNumber);


  }

  initForm() {
    this.form = this.formBuilder.group({
      answer1: [undefined, [Validators.required]],
      answer2: [undefined, [Validators.required]],
      answer3: [undefined, [Validators.required]],
      answer4: [undefined, [Validators.required]],
      answer5: [undefined, [Validators.required]],
    })
  }

  navigatePage() {
    if (this.exerciseNumber % 2 == 0) {
      this.moduleFacade.turnPageForward();
    } else {
      this.moduleFacade.turnPageBackward();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();  // Ensures all subscriptions are cleaned up
  }
}
