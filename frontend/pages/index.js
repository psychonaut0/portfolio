import { useRouter } from 'next/router'
import { fetchAPI } from '../lib/api'
import Layout from '../src/components/layout'
import Template from '../src/components/template'
import { useEffect } from 'react'

export default function Home({ data }) {


  const router = useRouter()



  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout data={data}>
      <Template data={data} />
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await fetchAPI('/home', { populate: 'deep' })
  const about = await fetchAPI('/about', { populate: 'deep' })
  const navigation = await fetchAPI('/navigation/render/1')
  const projects = await fetchAPI('/projects', { populate: 'deep', sort: ['category.name:ASC'] })
  const categories = await fetchAPI('/categories', { populate: 'deep', sort: ['name:ASC'] })
  const groups = await fetchAPI('/groups', { populate: 'deep', sort: ['orderId:ASC'] })
  const socials = await fetchAPI('/socials', { populate: 'deep' })

  return {
    props: {
      data: {
        home: data.data.attributes || {},
        about: about.data.attributes || {},
        meta: data.meta || {},
        navigation: navigation || [],
        projects: projects.data || [],
        categories: [...categories.data] || [],
        groups: [...groups.data] || [],
        socials: [...socials.data] || []
      }
    },
    revalidate: 10
  }
} 
