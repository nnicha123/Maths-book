import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModuleFacade } from '../../store/module.facade';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { Question } from '../../models/Question.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  form!: FormGroup;
  formControlName: string = 'answer' + this.exerciseNumber;
  private destroy$ = new Subject<void>();

  constructor(private moduleFacade: ModuleFacade, private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    this.patchStoreValuesToForm();
    this.listenToChanges();
  }

  patchStoreValuesToForm() {
    this.moduleFacade.getExerciseNo(this.exerciseNumber).pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(exercise => {
      if (exercise && exercise.questions && exercise.questions.length > 0) {
        exercise.questions.forEach((question, index) => {
          const formGroup = this.answers.at(index);
          if (formGroup) {
            formGroup.patchValue({
              value: question?.currentAnswer,
              isCorrect: question?.isCorrect,
              correctValue:question?.correctAnswer,
              questionNumber:question?.questionNumber,
              questionId:question?.questionId
            })
          }

          // Patch to isSubmitted
          this.isSubmitted?.patchValue(exercise.submitted);
          // Patch exerciseNumber
          this.formExerciseNumber?.patchValue(exercise.exerciseNumber);
          // Patch exerciseId
          this.formExerciseId?.patchValue(exercise.exerciseId);
        })
      }
    })
  }

  submitExercise() {
    this.moduleFacade.submitExercise(this.form.value)
  }

  // Come back to this - is this doing anything useful?
  listenToChanges() {
    this.form.valueChanges.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(exercise => this.form.patchValue({ ...exercise }));
  }

  initForm() {
    this.form = this.formBuilder.group({
      exerciseId: [0, [Validators.required]],
      exerciseNumber: [this.exerciseNumber, [Validators.required]],
      answers: this.formBuilder.array([]),
      isSubmitted: [false]
    })

    for (let i = 0; i < 5; i++) {
      this.addAnswersGroup();
    }
  }

  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  get isSubmitted() {
    return this.form.get('isSubmitted')
  }

  get formExerciseNumber() {
    return this.form.get('exerciseNumber')
  }

  get formExerciseId(){
    return this.form.get('exerciseId');
  }

  getAnswersFormGroup(index: number): FormGroup {
    return this.answers.at(index) as FormGroup
  }


  addAnswersGroup() {
    const answerGroup = this.formBuilder.group({
      value: [undefined, Validators.required],
      isCorrect: [false],
      correctValue:[undefined],
      questionNumber:[undefined],
      questionId:[undefined]
    })
    this.answers.push(answerGroup);
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
