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

  return {
    props: {
      data: "lol"
    },
    revalidate: 10
  }
} 
