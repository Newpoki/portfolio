export const seo = ({
  title,
  description,
  keywords,
  image,
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
}) => {
  const fallbackImage = `https://${process.env.VERCEL_PROJECT_PRODUCTION_UR}/about/me.png`;

  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@Newpokii" },
    { name: "twitter:site", content: "@Newpokii" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    {
      name: "twitter:image",
      content: image ?? fallbackImage,
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "og:image",
      content: image ?? fallbackImage,
    },
  ];

  return tags;
};
