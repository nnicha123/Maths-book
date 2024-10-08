import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise, ExerciseAPI } from '../../models/Exercise.model';
import { Question } from '../../models/Question.model';
import { Answer } from '../../models/Answer.model';
import { User } from '../../models/User.model';
import { Rank } from '../../models/Rank.model';

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

    submitExercise(exercise: ExerciseAPI): Observable<Question[]> {
        return this.httpClient.post<Question[]>(`${this.baseUrl}/submit`, exercise)
    }

    getAllAnswers(): Observable<Answer[]> {
        return this.httpClient.get<Answer[]>(`${this.baseUrl}/answers`)
    }

    updateRanking(updatedUser: User): Observable<User> {
        return this.httpClient.post<User>(`${this.baseUrl}/user/updateRanking`, updatedUser)
    }

    getAllRankings():Observable<Rank[]>{
        return this.httpClient.get<Rank[]>(`${this.baseUrl}/allRankings`)
    }
}
