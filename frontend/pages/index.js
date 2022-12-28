import { fetchAPI } from '../lib/api'
import Layout from '../src/components/layout'
import Template from '../src/components/template'

export default function Home({ data }) {

  console.log(data)


  return (
    <Layout data={data}>
      <Template data={data} />
    </Layout>
  )
}

export async function getStaticProps() {

  const data = await fetchAPI('/home',{populate: 'deep'})
  const navigation = await fetchAPI('/navigation/render/1')
  const projects = await fetchAPI('/projects', {populate: 'deep', sort: ['category.name:ASC']})
  const categories = await fetchAPI('/categories', {populate: 'deep', sort: ['name:ASC']})


  return {
    props: {
      data: {
        id: data.data.id,
        ...data.data.attributes,
        meta: data.meta || {},
        navigation: navigation || [],
        projects: projects.data || [],
        categories: [...categories.data] || []
      }
    },
    revalidate: 10
  }
} 
