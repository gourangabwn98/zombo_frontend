import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBh4dvUdzH2p9-Nx1qDdsr_7IvqKzWGbjk",
  authDomain: "zombo-7bd1a.firebaseapp.com",
  projectId: "zombo-7bd1a",
  appId: "1:977200598670:web:e1dd1e5b6338df5eaac3df",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
