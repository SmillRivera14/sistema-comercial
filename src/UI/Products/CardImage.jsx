import { useState } from "react";

export default function CardImage({ src = null, alt = null }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <span className="text-4xl opacity-50">📦</span>;
  }

  return (
    <img
      className="w-full h-full object-cover"
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
}
