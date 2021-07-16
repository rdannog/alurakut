import React from 'react'
import MainGrid from '../src/Components/MainGrid/index.js'
import Box from '../src/Components/Box/index.js'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/Components/ProfileRelations/index.js'

function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: "8px" }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'rhayssadandara'
  const pessoasFavoritas = ['pamelaferreiralima', 'tati2', 'luanpires94', 'gustavoguanabara', 'kelvgraf', 'igorcouto']
  const [comunidades, setComunidades] = React.useState([
    {
      id: 534524534651345,
      title: "Chuck Norris Sincero",
      image: 'http://3.bp.blogspot.com/_xuZyFxSS-UI/R7Rwb5HZ0JI/AAAAAAAAAnQ/5SZW3VkyxT4/w1200-h630-p-k-no-nu/chuck_norris.jpg'
    }
  ])

  const [followers, setFollowers]= React.useState([]);
  React.useEffect(function() {
    fetch('https://api.github.com/users/rhayssadandara/followers')
     .then(function (respostaDoServidor) {
       return respostaDoServidor.json()
     })
     .then(function(respostaCompleta) {
       setFollowers(respostaCompleta)
     })
    }, [])

    console.log(followers)

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a), {githubUser}</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault()
              const dadosDoForm = new FormData(e.target)
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas)
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
            <h2 className="subTitle">Depoimentos</h2>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox items={followers} title="Seguidores" />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/users/${item.title}`}>
                      <img src={item.image} alt="image" />
                      <span>{item.title}</span>
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
