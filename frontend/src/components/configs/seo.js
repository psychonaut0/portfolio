import { NextSeo } from "next-seo";

export default function Seo({ data }) {

  const seo = data.home.seo

  return (
    <NextSeo
      title={seo.metaTitle}
      description={seo.metaDescription}
      canonical={seo.canonicalURL}
      openGraph={{
        url: seo.canonicalURL,
        title: seo.metaTitle,
        description: seo.metaDescription,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${seo.metaImage.data.attributes.url}`,
            width: seo.metaImage.data.attributes.width,
            height: seo.metaImage.data.attributes.height,
            alt: seo.metaImage.data.attributes.alternativeText,
            type: seo.metaImage.data.attributes.mime,
          }
        ],
        siteName: 'Francesco Barbano',
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
  )
}
