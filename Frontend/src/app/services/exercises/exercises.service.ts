import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../../models/Exercise.model';
import { Question } from '../../models/Question.model';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    private baseUrl = "http://localhost:3000"

    constructor(private httpClient: HttpClient) { }

    getUserExercises(userId: number): Observable<Exercise[]> {
        return this.httpClient.get<Exercise[]>(`${this.baseUrl}/user/userExercise/${userId}`)
    }

    getAllQuestionsOfExerciseIdList(exerciseIdList: number[]): Observable<Question[]> {
        return this.httpClient.post<Question[]>(`${this.baseUrl}/questions`, exerciseIdList)
    }

    getExerciseQuestions(exerciseId: number): Observable<Question[]> {
        return this.httpClient.get<Question[]>(`${this.baseUrl}/exercise/${exerciseId}`)
    }
}
