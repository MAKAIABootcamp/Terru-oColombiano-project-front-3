import { collection, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../firebase/firebaseConfig";

const collectionName = 'users';
const userCollection = collection(dataBase, collectionName);

export const getUsers = async (uid) => {

    const user = [];
    try {
        const q = query(userCollection, where("uid", "==", uid))
        const userDocs = await getDocs(q)

        userDocs.forEach((doc) =>{
            user.push({
                id: doc.id,
                ...doc.data()
            })
        })
        return user[0]
        
    } catch (error) {
        console.log(error);
        
    }
  
}