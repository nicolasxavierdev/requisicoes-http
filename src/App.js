import React, { useEffect, useState } from 'react';
import './App.css';
import loading from './assets/loading-buffering.gif';

function App() {
  const [nutri, setNutri] = useState([]);
  const [error, setError] = useState({ erro: false, msg: '' });
  const [load, setLoad] = useState(false);

  useEffect(() => {

    function loadApi() {
      let url = 'https://sujeitoprogramador.com/rn-api/?api=posts';

      fetch(url)
        .then((r) => r.json())
        .then((json) => {
          console.log(json);
          setNutri(json);
        }).catch((erro) => {
          const e = { erro: true, msg: 'Ops, ouve algum erro!' }
          setError(e);
          console.error(erro.message)
        }).finally(() => {
          setLoad(false);
        })

    }

    loadApi();
  }, []);

  return (
    <div className="container">
      <header>
        <strong>React Nutri</strong>
      </header>

      {load ?
        <> <img src={loading} alt='loadind...' /> </>
        :
        <>
          {!error.erro ?
            <>
              {nutri.map((item) => {
                return (
                  <article key={item.id} className="post">
                    <strong className="titulo">{item.titulo}</strong>

                    <img src={item.capa} alt={item.titulo} className="capa" />
                    <p className="subtitulo">
                      {item.subtitulo}
                    </p>
                    <a className="botao" href={item.capa} target='_blank'>Acessar</a>
                  </article>
                )
              })}

            </> :
            <>

              <strong>{error.msg}</strong>

            </>
          }
        </>
      }



    </div>
  );
}

export default App;
