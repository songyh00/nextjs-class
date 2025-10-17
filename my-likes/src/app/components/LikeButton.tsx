"use client";

import React from "react";

export default function LikeButton({ initial }: { initial: number }) {
    const [likes, setLikes] = React.useState(initial);

    return (
        <button
            onClick={() => setLikes((n) => n + 1)}
            style={{
                marginTop: 12,
                border: "1px solid #ddd",
                background: "#fff",
                padding: "8px 12px",
                cursor: "pointer",
                borderRadius: 6,
            }}
        >
            👍 {likes}
        </button>
    );
}
