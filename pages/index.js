import prisma from '../lib/prisma'
import Layout from '../src/components/layout'

export default function Home({ data }) {

  console.log(data)

  return (
    <Layout>
      <a href='http://google.com'>asd</a>
    </Layout>
  )
}

export async function getStaticProps() {
  const test = await prisma.post.findMany({})

  return {
    props: {
      data: test
    },
    revalidate: 10
  }
} 
