"use client";

export default function profileerror({ error, reset }) {
  return (
    <div className="error-message">
      {error.message}
      {/* <button onClick={reset}>Reset</button> */}
    </div>
  );
}
