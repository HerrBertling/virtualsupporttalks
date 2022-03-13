const contentfulManagement = require("contentful-management");

const dotenv = require("dotenv");
dotenv.config();

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  });

  return contentfulClient
    .getSpace(process.env.CONTENTFUL_SPACE)
    .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT));
};
