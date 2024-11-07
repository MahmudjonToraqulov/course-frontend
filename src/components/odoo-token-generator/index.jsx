import { useState } from "react";

const GenerateToken = () => {
  const accessToken = localStorage.getItem("user")
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(accessToken)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };
  const displayToken = `${accessToken.slice(0, 20)}.......${accessToken.slice(
    -20
  )}`;
  return (
    <div className="pt-90 p-4 my-4">
      <div className="box-bg-theme w-50 m-auto p-4 rounded">
        <span className="fs-1 text-center d-block mb-2">
           Token
        </span>

        <p className="text-center">{displayToken}</p>
        <button
          onClick={handleCopy}
          className={` btn text-light m-auto d-block
          ${copied ? "bg-success" : "btn-main"}
          `}
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>
    </div>
  );
};

export default GenerateToken;