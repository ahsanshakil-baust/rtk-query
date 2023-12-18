"use client";

import {
  useGetUsersQuery,
  useNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/redux/features/apiSlice";
import { useState } from "react";

export default function Home() {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [user, setUser] = useState({ name: "" });

  const {
    data: users,
    isLoading,
    isSuccess, // Check for proper variable name (typo corrected)
    isError,
    error,
  } = useGetUsersQuery("");

  const [newUser] = useNewUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!edit) newUser(user);
    else updateUser(user);

    setUser({ name: "" });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <form onSubmit={handleSubmit}>
        <input
          className="text-[#000]"
          type="text"
          name="name"
          id="name"
          placeholder="Enter Name: "
          value={user.name}
          onChange={(e: any) =>
            setUser((state) => ({ ...state, name: e.target.value }))
          }
        />
        <button type="submit">{edit ? "Update" : "Submit"}</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error?.message}</p>
      ) : (
        <ul className="mt-10">
          {users.map((user: any, index: number) => (
            <li key={index}>
              {user.name}
              <button
                className="ml-5"
                onClick={() => {
                  setEdit(true);
                  setUser((prevState) => ({ name: user.name, id: user.id }));
                }}
              >
                Edit
              </button>

              <button
                className="ml-5"
                onClick={() => {
                  deleteUser(user);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
