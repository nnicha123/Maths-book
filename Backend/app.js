import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Checking it works!");
})
    .post("/auth/login", loginUser)
    .get('/user/users', getUsers)
    .get('/user/userSingle/:userId', getSingleUser)
    .get('/user/userExercise/:userId', getUserExercises)
    .get('/exercise/:exerciseId', getQuestionsFromExerciseId)
    .post('/questions', getQuestionsFromExerciseList)
    .post('/submit', submitAnwers)
    .get('/answers', getAnswers)
    .post('/user/updateRanking', updateRanking)
// .get('/allRankings', getAllRankings)

app.listen(3000, () => {
    console.log('Listening at: http://localhost:3000');
})

function getUsers(req, res) {
    fs.readFile("users.json", { encoding: "utf-8" }, (err, results) => {
        let userList = JSON.parse(results);
        res.send(userList);
    })
}

function getAnswers(req, res) {
    fs.readFile("answers.json", { encoding: "utf-8" }, (err, results) => {
        let answers = JSON.parse(results);
        res.send(answers);
    })
}

function getSingleUser(req, res) {
    fs.readFile("users.json", { encoding: "utf-8" }, (err, results) => {
        let userId = 1;
        if (req.params.userId) {
            userId = +req.params.userId;
        }
        let userList = JSON.parse(results);
        let singleUser = userList.filter(row => row.userId === userId)[0];
        res.send(singleUser);
    })
}

function loginUser(req, res) {
    // To add security later
    const { username, password } = req.body;
    fs.readFile("users.json", { encoding: "utf-8" }, (err, results) => {
        let userList = JSON.parse(results);
        let singleUser = userList.filter(row => row.username === username && row.password === password)[0];
        if (singleUser) {
            res.send(singleUser);
        } else {
            res.status(401).send({ "message": "Unauthorized: Cannot find username password combination" })
        }
    })
}

function updateRanking(req, res) {
    const userEdited = req.body;
    fs.readFile("users.json", { encoding: "utf-8" }, (err, results) => {
        let userList = JSON.parse(results);
        userList = userList.filter(user => user.userId !== userEdited.userId).concat(userEdited);
        const userListText = JSON.stringify(userList);
        writeToFile("users.json", userListText)
            .then(() => res.send(userEdited))
            .catch(() => res.status(500).send({ "message": "Errir writing to users file" }))
    })
}

function submitAnwers(req, res) {
    const submittedExercise = req.body;

    updateExerciseFile(submittedExercise)
        .then((updatedExercise) => {
            return updateQuestionsToFile(updatedExercise)
        })
        .then((updatedQuestionsList) => {
            res.status(200).send(updatedQuestionsList)
        })
        .catch((error) => {
            console.error("Error updating answers:", error);
            res.status(500).send({ "Error": "Error updating answers" })

        })
}

function getUserExercises(req, res) {
    fs.readFile("exercise.json", { encoding: "utf-8" }, (err, results) => {
        let exerciseList = JSON.parse(results);
        if (req.params.userId) {
            let userId = +req.params.userId;
            const userExercises = exerciseList.filter(row => row.userId === userId);
            res.send(userExercises);
        } else {
            res.status(500).send({ "message": "Cannot find exercises related to userId" })
        }

    })
}

function getQuestionsFromExerciseList(req, res) {
    fs.readFile("question.json", { encoding: "utf-8" }, (err, results) => {
        let questionsList = JSON.parse(results);
        if (req.body) {
            const exerciseIds = req.body
            const filteredQuestions = questionsList.filter(item => exerciseIds.includes(item.exerciseId));
            res.send(filteredQuestions);
        } else {
            res.status(500).send({ "message": "Cannot find questions related to exerciseId" })
        }
    })
}

function getQuestionsFromExerciseId(req, res) {
    fs.readFile("question.json", { encoding: "utf-8" }, (err, results) => {
        let questionsList = JSON.parse(results);
        if (req.params.exerciseId) {
            let exerciseId = +req.params.exerciseId;
            const questions = questionsList.filter(row => row.exerciseId === exerciseId);
            res.send(questions);
        } else {
            res.status(500).send({ "message": "Cannot find questions related to exerciseId" })
        }

    })
}

function updateExerciseFile(updatedExercise) {
    return new Promise((resolve, reject) => {
        fs.readFile("exercise.json", { encoding: "utf-8" }, (err, results) => {
            if (err) {
                return reject(err)
            }

            try {
                let exerciseList = JSON.parse(results);
                let newExerciseList;
                if (updatedExercise.exerciseId) {
                    newExerciseList = exerciseList.map((exercise) => {
                        if (exercise.exerciseId === updatedExercise.exerciseId) {
                            exercise.submitted = true
                            return exercise
                        }
                        return exercise;
                    })
                } else {
                    // create new exercise with exerciseId
                    exerciseList.sort((a, b) => {
                        return a.exerciseId > b.exerciseId ? 1 : -1;
                    })
                    let latestExerciseId = exerciseList[exerciseList.length - 1].exerciseId;

                    const newExercise = {
                        exerciseId: latestExerciseId + 1,
                        userId: updatedExercise.userId,
                        exerciseNumber: updatedExercise.exerciseNumber,
                        submitted: true
                    }
                    newExerciseList = exerciseList.concat(newExercise);

                    // Add exerciseId to updatedExercise before sending out
                    updatedExercise.exerciseId = latestExerciseId + 1;

                }

                const exerciseListText = JSON.stringify(newExerciseList);

                writeToFile("exercise.json", exerciseListText)
                    .then(() => resolve(updatedExercise))
                    .catch(reject)

            } catch (parseError) {
                reject(parseError);
            }
        })
    })
}

function updateQuestionsToFile(updatedExercise) {
    return new Promise((resolve, reject) => {
        // Just replace questions with new questions/answers
        fs.readFile("question.json", { encoding: "utf-8" }, (err, results) => {
            if (err) {
                return reject(err)
            }

            try {
                const questionList = JSON.parse(results);
                let newQuestionsList = questionList.filter((question => question.exerciseId !== updatedExercise.exerciseId))

                if (questionList.length !== newQuestionsList.length) {
                    // If exerciseId already recorded in questions file
                    newQuestionsList = newQuestionsList.concat(updatedExercise.questions);
                } else {
                    // if exerciseId newly added (no previous record)
                    // Add ids to questions
                    let questionsToUpdate = updatedExercise.questions;
                    questionList.sort((a, b) => {
                        return a.questionId > b.questionId ? 1 : -1;
                    })
                    let latestQuestionId = questionList[questionList.length - 1].questionId;
                    questionsToUpdate = questionsToUpdate.map((question, index) => {
                        return {
                            ...question,
                            exerciseId: updatedExercise.exerciseId,
                            questionId: latestQuestionId + index + 1
                        }
                    })
                    newQuestionsList = newQuestionsList.concat(questionsToUpdate);
                }

                const questionsListText = JSON.stringify(newQuestionsList);

                // Return updated questions
                const questionListToReturn = newQuestionsList.filter((question) => question.exerciseId == updatedExercise.exerciseId);
                writeToFile("question.json", questionsListText)
                    .then(() => resolve(questionListToReturn))
                    .catch(reject);

            } catch (parseError) {
                reject(parseError);
            }
        })

    })

}

function writeToFile(fileName, fileText) {
    return new Promise((resolve) => {
        fs.writeFile(fileName, fileText, (err) => {
            if (err) {
                console.log(err);
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}