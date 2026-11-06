// Structured data ko <script> me daalta hai. "<" ko escape karte hain, taaki data se script tag toot na sake.
export default function JsonLd({ data }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data).replace(/</g, "\\u003c"),
            }}
        />
    );
}