import React from "react";

function ArrowForBtn({ classname }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
    >
      <circle cx="16" cy="16" r="16" fill="#7D41ED" className={classname} />
      <path
        d="M19.2541 8.24106C19.5522 8.53326 19.5793 8.99051 19.3354 9.31272L19.2541 9.40503L12.5266 16L19.2541 22.595C19.5522 22.8872 19.5793 23.3444 19.3354 23.6666L19.2541 23.7589C18.956 24.0511 18.4896 24.0777 18.161 23.8386L18.0668 23.7589L10.7459 16.582C10.4478 16.2898 10.4207 15.8325 10.6646 15.5103L10.7459 15.418L18.0668 8.24106C18.3947 7.91965 18.9262 7.91965 19.2541 8.24106Z"
        fill="white"
        className={classname}
      />
    </svg>
  );
}

export default ArrowForBtn;
