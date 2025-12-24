import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://zombo.store/og-image.jpg"
      />{" "}
      {/* Add this image later */}
      <meta property="og:url" content="https://zombo.store" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://zombo.store/og-image.jpg" />
      {/* Canonical URL */}
      <link rel="canonical" href="https://zombo.store" />
    </Helmet>
  );
};

export default SEO;
