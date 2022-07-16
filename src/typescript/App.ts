import Todo from './models/todo';
import FireStoreStorage from './repository/firestoreStorage';

const firestoreStorage = new FireStoreStorage();

firestoreStorage.get(1).then(todo => {
    console.log('get :', todo);
})
.catch(e => {
    console.log('get :', e);
});

firestoreStorage.get(10).then(todo => {
    console.log('get :', todo);
})
.catch(e => {
    console.log('get :', e);
});

firestoreStorage.getAll().then(todos => {
    console.log('getAll :', todos);
})
.catch(e => {
    console.log('getAll :', e);
});

const todo = new Todo(3, 'Test', false);
firestoreStorage.add(todo).then(todo => {
    console.log('add :', todo);
})
.catch(e => {
    console.log('add :', e);
});