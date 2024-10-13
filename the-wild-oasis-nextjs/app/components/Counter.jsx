"use client";

import { useState } from "react";

export default function Counter({ user }) {
  const [counter, setCounter] = useState(0);
  console.log(user);

  return (
    <>
      <p>There are {user?.length} users</p>
      <button onClick={() => setCounter((c) => c + 1)}>{counter}</button>
    </>
  );
}
