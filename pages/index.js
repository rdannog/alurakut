import React from 'react'
import MainGrid from '../src/Components/MainGrid/index.js'
import Box from '../src/Components/Box/index.js'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/Components/ProfileRelations/index.js'

function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: "8px"}} />
      <hr />

      <p>
        <a className="boxLink"  href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const user = 'rhayssadandara'
  const pessoasFavoritas = ['pamelaferreiralima', 'tati2', 'luanpires94', 'gustavoguanabara', 'kelvgraf', 'igorcouto']
  const [comunidades, setComunidades] = React.useState(["Alurakut"])
  
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1>Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e){
                e.preventDefault()
                const comunidadesAtualizadas = [...comunidades,'Alura Stars']
                setComunidades(comunidadesAtualizadas)
                console.log(comunidades)
              }
            }
            >
              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?" 
                type="text"
                />
              </div>
              <div>
                 <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa" 
                  />
              </div>
             <button>
               Criar comunidade
             </button>
            </form>
          </Box>
          <Box>
            <h2 className="smallTitle">Depoimentos</h2>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
          <ul>
              {comunidades.map((item) => {
                return (
                  <li>
                    <a href={`/users/${item}`} key={item}>
                      <img src={`http://placehold.it/300x300`} alt="image" />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((item) => {
                return (
                  <li>
                    <a href={`/users/${item}`} key={item}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )
}
