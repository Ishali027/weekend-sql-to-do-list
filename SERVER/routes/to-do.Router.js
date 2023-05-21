const express = require('express');
const todoRouter = express.Router();

const pool = require("../modules/pool");

// todoRouter.get('/', (req, res) => {
//     let queryText = 'SELECT * FROM "to_do_list";';
//     pool.query(queryText)
//     .then(result => {
//         res.send(result.rows);
//     })
//     .catch(error => {
//         console.log('Query:', queryText, 'Error:', error);
//         res.sendStatus(500);
//     })
// });

todoRouter.post('/', (req, res) => {
    
    const newToDo = req.body;

    console.log('req.body:', req.body);
    const queryText = `
    INSERT INTO "to_do_list" ("task")
    VALUES($1)
    `;

    // const values = [newToDo.task];
    pool.query(queryText, [newToDo.taskToSend])
    .then(result => {
        // console.log(result.rows);
        res.sendStatus(200);

    })
    .catch(error => {
        console.log('Query text', queryText, 'error', error)
        res.sendStatus(500);
    })
})

todoRouter.get ('/', (req, res) => {
    let queryText = 'SELECT * FROM "to_do_list";';
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Query:',queryText, 'Error', error);
            res.sendStatus(500);
        })
});

todoRouter.put('/:id', (req, res) => {
    let idtoUpdate = req.params.id;
    let queryText = `UPDATE "to_do_list" SET "completed" = '1' 
    WHERE "id" = $1;
    `

    pool.query(queryText,[idtoUpdate])

    .then(result => {
        console.log('Task updated', result.rows)
        res.sendStatus(200)
    })
    .catch(error => {
        console.log('Query text:', queryText, 'error', error);
        res.sendStatus(500);
    })


});

todoRouter.delete('/:id', (req, res) => {
    let idtoDelete = req.params.id;
    let queryText = `DELETE FROM "to_do_list" WHERE "id" = $1`;
    pool.query(queryText, [idtoDelete])
        .then((result) => {
            console.log(`todo with id ${idtoDelete} was deleted.`, result);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log("Error", error)
            res.sendStatus(500);
        });
});








// todoRouter.get('/', (req, res) => {
//     let queryText = 'SELECT * FROM "to_do_list";';
//     pool.query(queryText)
//     .then(result => {
//         res.send(result.rows);
//     })
//     .catch(error => {
//         console.log('Query:', queryText, 'Error:', error);
//         res.sendStatus(500);
//     })
// });



















module.exports = todoRouter