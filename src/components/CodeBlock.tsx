import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { faExpand, faXmark } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon

interface CodeBlockProps {
  code: string;
  language?: string;
  title: string;
  description?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title, description }) => {
  const codeRef = useRef<HTMLPreElement>(null);
  const [isClicked, setIsClicked] = useState(false);

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

  const isClickedHandle = () => {
    setIsClicked(!isClicked);
  };


  return (
    <>
    <section>
      <h2>{title}</h2>
      <small>{language}</small>
      <div className="code-container">
        <button className="copy-button" onClick={copyToClipboard}>Copiar</button>
        <pre className={isClicked ? 'mh-initial overflow-hidden' : 'mh-300 overflowY-scroll'} ref={codeRef}>
          {code}
        </pre>
        <div className='absolute-view' title='Ver completo' onClick={isClickedHandle}>
          <FontAwesomeIcon icon={isClicked ? faXmark : faExpand} />
        </div>
      </div>
      <p>{description}</p>
    </section>
    </>
  );
};

export default CodeBlock;