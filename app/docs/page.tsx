"use client";

import dynamic from "next/dynamic";
import type { FC } from "react";
import "swagger-ui-react/swagger-ui.css";

// 👇 explicitly tell TS this is a React component that accepts ANY props
const SwaggerUI = dynamic(
    () =>
        import("swagger-ui-react").then(
            (mod) => mod.default as FC<any>
        ),
    { ssr: false }
);

export default function DocsPage() {
    return <SwaggerUI url="/api/docs/openapi" />;
}
