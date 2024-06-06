import React, { useState } from 'react';
import CodeBlock from './components/CodeBlock';
import codeExamples from './assets/codes.json';

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Todos');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const filteredExamples = selectedLanguage === 'Todos'
    ? codeExamples
    : codeExamples.filter(example =>
        example.language.split(', ').map(lang => lang.toLowerCase()).includes(selectedLanguage.toLowerCase())
      );

  return (
    <>
    <div style={{height: '100%'}}>
      <div className='top-container'>
        <h2>Códigos de programación</h2>
        <div>
          <select id="language-select" title='Selecciona un lenguaje' value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="Todos">Todos</option>
            <option value="PHP">Php</option>
            <option value="JavaScript">JavaScript</option>
            <option value="HTML">Html</option>
            <option value="CSS">Css
            </option>
          </select>
        </div>
      </div>
      {filteredExamples.map((example, index) => (
        <CodeBlock
          key={index}
          code={example.code}
          language={example.language}
          title={example.title}
          description={example.description}
        />
      ))}
    </div>
    <footer>
      <p>
        Creado por <a href="https://github.com/jhorman9/">Jhorman Nieto P</a>
      </p>
    </footer>
    </>
  );
};

export default App;
