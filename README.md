# Redezeit website

## Installation

```
npm install
```

### Configure .env

Please copy the `.env.template` and rename it to `.env`. 
You can ignore `CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN` for now, The other values can be found in Contentful. Go to `Settings` in the right-upper corner > `API keys` > `Add API key`. From there you can find the Space, Access Token as well as the environment.

## Generate Contentful types

In order to successfully run `npm run contentful-typescript-codegen`, you need to add the `CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN` to your local `.env` file. You can generate this token in the Contentful web app under `Settings > CMA Tokens > Create personal access token`.

## Local development

```
npm run dev
```
