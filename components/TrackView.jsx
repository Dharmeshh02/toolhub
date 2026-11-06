"use client";

import { useEffect } from "react";
import { addRecent } from "@/lib/recent";

export default function TrackView({ slug }) {
    useEffect(() => {
        addRecent(slug);
    }, [slug]);

    return null;
}