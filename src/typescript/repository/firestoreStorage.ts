import Constants from '../constants';
import Todo from '../models/todo';
import GenericStorage from './genericStorage';

import { FirebaseApp, initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, doc, getDoc, setDoc, DocumentSnapshot, SnapshotOptions, FirestoreDataConverter, Firestore } from 'firebase/firestore';

export default class FireStoreStorage implements GenericStorage<Todo>{
    private firebaseApp: FirebaseApp;
    private db: Firestore;

    constructor() {
        this.firebaseApp = initializeApp(Constants.FIREBASE_CONFIG);
        this.db = getFirestore(this.firebaseApp);
    }

    async getAll(): Promise<Todo[]> {
        const todos: Todo[] = [];
        const collectionReference = collection(this.db, Constants.FIREBASE_TODOS_PATH).withConverter(this.todoConverter());
        const querySnapshot = await getDocs(collectionReference);
        querySnapshot.forEach((doc) => {
            todos.push(doc.data());
        });

        return todos;
    }

    async get(id: number): Promise<Todo | null> {
        const documentReference = doc(this.db, Constants.FIREBASE_TODOS_PATH, id.toString()).withConverter(this.todoConverter());
        const documentSnapshot = await getDoc(documentReference);
        if (documentSnapshot.exists()) {
            return documentSnapshot.data();
        }
        
        return null;
    }

    async addOrUpdate(item: Todo): Promise<Todo> {
        return await this.add(item); //Firestore gère automatiquement le fait d'ajouter ou mettre à jour une ressource (en se basant sur l'ID). On peut donc toujours appeler la même méthode
    }

    async update(item: Todo): Promise<Todo>{
        return await this.add(item); //Firestore gère automatiquement le fait d'ajouter ou mettre à jour une ressource (en se basant sur l'ID). On peut donc toujours appeler la même méthode
    }

    async add(item: Todo): Promise<Todo>{
        const documentReference = doc(this.db, Constants.FIREBASE_TODOS_PATH, item.id.toString()).withConverter(this.todoConverter());
        setDoc(documentReference, item);

        return item;
    }

    /**
     * Méthode permettant d'indiquer à FireStore comment convertir un document de la collection todos en objet Todo (et inversement)
     * 
     * @returns FirestoreDataConverter<Todo>
     */
    private todoConverter(): FirestoreDataConverter<Todo> {
        return {
            toFirestore: (todo: Todo) => {
                return {
                    id: todo.id,
                    label: todo.label,
                    isDone: todo.isDone
                };
            },
            fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
                const data = snapshot.data(options);
                return new Todo(data.id, data.label, data.isDone);
            }
        };
    }
}