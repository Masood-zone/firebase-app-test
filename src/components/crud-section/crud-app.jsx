import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../api/firebase-config";

function UserCrudApp() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [users, setUsers] = useState([]);
  const userRef = collection(db, "users");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getDocs(userRef);
        setUsers(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userRef]);

  const addUser = async (e) => {
    e.preventDefault();
    // Add user to firestore
    try {
      const docRef = await addDoc(userRef, {
        name: username,
        age: Number(age),
      });
      setUsers([...users, { name: username, age, id: docRef.id }]);
      setUsername("");
      setAge(0);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const increaseAge = async (id, age) => {
    // Increase user age
    const userId = doc(userRef, id);
    const userDoc = { age: age + 1 };
    try {
      await updateDoc(userId, userDoc);
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, age: user.age + 1 } : user
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    // Delete user
    try {
      await deleteDoc(doc(userRef, id));
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="">
      <h1>Users</h1>

      {/* Create users */}
      <form
        onSubmit={addUser}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          gap: "1rem",
          margin: "1rem 0",
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Name"
        />
        <input
          type="number"
          value={age}
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Add user</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.age}</p>
            {/* Increase user age */}
            <button onClick={() => increaseAge(user.id, user.age)}>
              Increase age
            </button>
            {/* Delete user button */}
            <button
              onClick={() => deleteUser(user.id)}
              style={{ backgroundColor: "red", color: "white  " }}
            >
              Delete user
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserCrudApp;
