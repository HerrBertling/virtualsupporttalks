import contentfulManagement from "contentful-management";
import dotenv from "dotenv";

dotenv.config();

export default function getContentfulEnvironment() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  });

  return contentfulClient
    .getSpace(process.env.CONTENTFUL_SPACE)
    .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT));
}
