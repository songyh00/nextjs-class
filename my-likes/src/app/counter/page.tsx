"use client";
import { useState } from "react";

export default function CounterPage() {
    const [n, setN] = useState(0);
    return (
        <main>
            <h2>Counter</h2>
            <p>값: {n}</p>
            <button onClick={() => setN(n + 1)}>+1</button>
            <button onClick={() => setN(0)} style={{ marginLeft: 8 }}>Reset</button>
        </main>
    );
}
