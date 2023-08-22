import { initializeApp } from "firebase/app";
import {
    collection,
    addDoc,
    setDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    getFirestore,
    query,
    orderBy,
    limit
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAPAEM3Vi2ZKPKXzRaEAhEqgrZDTgHdI-U",
    authDomain: "foreighsongs.firebaseapp.com",
    projectId: "foreighsongs",
    storageBucket: "foreighsongs.appspot.com",
    messagingSenderId: "1069466715955",
    appId: "1:1069466715955:web:56ecbde50ac3e3509f6046"
};

initializeApp(firebaseConfig);
getFirestore();


const db = getFirestore();

export default {
    // Записываем инфу в бд
    async addToDatabase(collectionName, data) {
        try {
            const docRef = await addDoc(collection(db, collectionName), data);

            console.log(`Document written with ID: ${docRef.id}`)
        } catch (e) {
            console.error(`Error: ${e}`)
        }
    },
    async setDocToDatabase(collectionName, docId, data) {
        try {
            const docRef = await setDoc(doc(db, collectionName, docId), data);

            console.log(`Document written with ID: ${docRef.id}`)
        } catch (e) {
            console.error(`Error: ${e}`)
        }
    },
    // Получить все записи
    async getCollection(collectionName) {
        try {
            // Получаем коллекцию от Firebase
            const querySnapshot = await getDocs(collection(db, collectionName));
            const result = [];

            querySnapshot.forEach((doc) => {
                // console.log(doc.data())
                result.push(doc.data());
            });
            return result;

        } catch (e) {
            console.error(`Error: ${e}`)
        }
    },
    // Получить конкретный документ
    async getDocument(collectionName, documentName) {
        const docRef = doc(db, collectionName, documentName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            // docSnap.data() will be undefined in this case
            console.error("No such document!");
        }
    },
    // Редактирование БД
    async updateData(collectionName, documentName, data) {
        try {
            // Получаем конкретный документ (3PUygBSwt0FJ5Gpctw76)
            const document = doc(db, collectionName, documentName);
            // Обновляем данные
            await updateDoc(document, data
            //     {
            //     name: "Dmitrii",
            //     lastName: "Smelov"
            // }
            );

            // console.log("Update PF8Yo7xWKGN92vIHD25i")
        } catch (e) {
            console.error(`Error: ${e}`)
        }
    },
    // Удалить из БД
    async deleteData(collectionName, documentName) {
        try {
            // Получаем конкретный документ (3PUygBSwt0FJ5Gpctw76)
            const user = doc(db, collectionName, documentName);
            // Удаляем данные
            await deleteDoc(user);

            // console.log("Delete 3PUygBSwt0FJ5Gpctw76")
        } catch (e) {
            console.error(`Error: ${e}`)
        }
    },
    // Сортировка и лимиты
    async orderCollection() {
        try {
            const q = query(
                collection(db, "1"),
                orderBy("age"), // Через запятую можно указать asc - по возрастанию; desc - по убыванию
                limit(5)
            );

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
            });

        } catch (e) {
            console.error(`Error: ${e}`)
        }
    }
};