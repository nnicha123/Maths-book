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

app.listen(3000, () => {
    console.log('Listening at: http://localhost:3000');
})

function getUsers(req, res) {
    fs.readFile("users.json", { encoding: "utf-8" }, (err, results) => {
        // console.log(results);
        let userList = JSON.parse(results);
        res.send(userList);
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
        if (req.body.exerciseIdList) {
            let exerciseIds = req.body.exerciseIdList;
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