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
  const Blogprojects = await fetchAPI('/projects', {populate: 'deep'})
  const categories = await fetchAPI('/categories', {populate: 'deep'})


  return {
    props: {
      data: {
        id: data.data.id,
        ...data.data.attributes,
        meta: data.meta || {},
        navigation: navigation || [],
        projects: projects.data || [],
        categories: categories.data || []
      }
    },
    revalidate: 10
  }
} 
