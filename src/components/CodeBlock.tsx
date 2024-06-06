import React, { useRef } from 'react';
import Swal from 'sweetalert2';

interface CodeBlockProps {
  code: string;
  language?: string;
  title: string;
  description?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title, description }) => {
  const codeRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Código copiado exitosamente",
        });
      }).catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal!",
          footer: `<a href="#">${err}</a>`
        });
      });
    }
  };

  return (
    <>
    <section>
      <h2>{title}</h2>
      <small>{language}</small>
      <div className="code-container">
        <button className="copy-button" onClick={copyToClipboard}>Copiar</button>
        <pre ref={codeRef}>
          {code}
        </pre>
      </div>
      <p>{description}</p>
    </section>
    </>
  );
};

export default CodeBlock;