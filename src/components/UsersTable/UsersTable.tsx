import { useEffect, useState } from "react";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Auth } from "../Authorization/Auth";

interface User {
  id: string;
  mechanic: string;
  shift: string;
  workInTheSystem: boolean;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  const usersCollectionRef = collection(db, "user");

  const getUsers = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        mechanic: doc.data().mechanic,
        shift: doc.data().shift,
        workInTheSystem: doc.data().workInTheSystem,
      }));
      setUsers(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div>
        <Auth />
      </div>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <div>{user.mechanic}</div>
            <div>{user.shift}</div>
            <div>{user.workInTheSystem}</div>
          </div>
        );
      })}
    </>
  );
};

export default App;
