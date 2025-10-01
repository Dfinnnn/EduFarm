import { db } from "../src/firebase";
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { getClientId } from "./clientId";

// Add a post
export async function addPost(text: string, user: string) {
  const clientId = getClientId();
  return await addDoc(collection(db, "posts"), {
    text,
    user,
    clientId,
    createdAt: serverTimestamp(),
  });
}

// Delete a post
export async function deletePost(postId: string, postClientId: string) {
  const clientId = getClientId();
  if (clientId !== postClientId) {
    throw new Error("You can only delete your own post!");
  }
  await deleteDoc(doc(db, "posts", postId));
}

// Add a reply
export async function addReply(postId: string, text: string) {
  const clientId = getClientId();
  await addDoc(collection(db, "posts", postId, "replies"), {
    text,
    clientId,
    createdAt: serverTimestamp(),
  });
}

// Delete a reply
export async function deleteReply(postId: string, replyId: string, replyClientId: string) {
  const clientId = getClientId();
  if (clientId !== replyClientId) {
    throw new Error("You can only delete your own reply!");
  }
  await deleteDoc(doc(db, "posts", postId, "replies", replyId));
}
