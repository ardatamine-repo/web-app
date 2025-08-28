"use client"
import { decrement, increment } from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";

function Counter() {
    const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  return <div>
          <h1>Count: {count}</h1>
          <button onClick={() => dispatch(increment())}>Incrementar</button>
          <button onClick={() => dispatch(decrement())}>Decrementar</button>
        </div>;
}

export default Counter;
