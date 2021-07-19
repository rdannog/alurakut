import React from 'react'
import MainGrid from '../src/Components/MainGrid/index.js'
import Box from '../src/Components/Box/index.js'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/Components/ProfileRelations/index.js'


function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBoxFav(props){
  return (
    <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              {props.title} ({props.items.length})
            </h2>
            <ul>
              {props.items.slice(0,6).map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`https://github.com/${item.login}`} key={item.id}>
                      <img src={`https://github.com/${item.login}.png`} />
                      <span>{item.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {props.items.slice(0,6).map((item) => {
          return (
            <li key={item.id}>
              <a href={`https://github.com/${item.login}`} key={item.id}>
                <img src={`https://github.com/${item.login}.png`} />
                <span>{item.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'rhayssadandara'
  const [comunidades, setComunidades] = React.useState([])
  const [followers, setFollowers] = React.useState([]);
  const [following, setFollowing] = React.useState([]);
  
  React.useEffect(function () {
    fetch('https://api.github.com/users/rhayssadandara/followers')
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json()
      })
      .then(function (respostaCompleta) {
        setFollowers(respostaCompleta)
      })

      fetch('https://api.github.com/users/rhayssadandara/following')
      .then(function (resposta) {
        return resposta.json()
      })
      .then(function (response) {
        setFollowing(response)
      })

      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': '411a9b677d88957cf96f2f70d71627',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ "query": `
          query {
            allCommunities{
            title
            id
            imageUrl
            creatorSlug
            }
          }` 
        })
      })
      .then((response) => response.json())
      .then((respostaCompleta) => {
        const comunidadesApi = respostaCompleta.data.allCommunities
        console.log(comunidadesApi)
        setComunidades(comunidadesApi)
      })
  }, [])

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
          <ProfileRelationsBoxFav items={following} title="Pessoas Favoritas" />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0,6).map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/users/${item.id}`}>
                      <img src={item.imageUrl} alt="image" />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBox items={followers} title="Seguidores" />
        </div>

      </MainGrid>
    </>
  )
}
