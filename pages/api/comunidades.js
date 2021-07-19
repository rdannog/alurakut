import { SiteClient } from 'datocms-client'

export default async function RecebedorDeDados(request, response){
    const TOKEN = "8d9fcb85973107b44dd6a7ee0cc6d7"
    const client = new SiteClient(TOKEN);
    const resgistroCriado = await client.items.create({
        itemType: "972985",
        title: "Comunidade exemplo",
        imageUrl:"https://github.com/rhayssadandara.png",
        creatorSlug:"Dands",
    })
    console.log(resgistroCriado)
    response.json({
        dados:'Algum dado',
        resgistroCriado: resgistroCriado,
    })
}