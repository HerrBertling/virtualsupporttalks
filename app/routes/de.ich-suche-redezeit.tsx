import { ICoach } from "../../@types/generated/contentful";
import { useLoaderData, useCatch, Form } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import {
  getCoaches,
  getLanguages,
  getMainNav,
  getPageById,
  getTags,
} from "~/utils/contentful";
import ContentBlocks from "~/components/ContentBlocks";
import pageIds from "~/utils/pageIds";
import CoachCard from "~/components/CoachCard";
import ContentfulRichText from "~/components/ContentfulRichText";
import { CheckIcon } from "@heroicons/react/outline";
import BasicLayout from "~/components/layout/BasicLayout";

export const loader: LoaderFunction = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams;
  const lang = searchParams.get("lang") || "de";
  const checkedTags = searchParams.getAll("tag");
  const locale = params.locale || "de";

  const page = getPageById(pageIds.SEARCH_HELP);
  const coaches: Promise<ICoach[]> = getCoaches(lang);
  const languages = getLanguages();
  const tags = getTags();
  const navigation = getMainNav("de");

  const data = await Promise.all([page, coaches, languages, tags, navigation]);

  if (!coaches) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  if (!navigation) {
    throw new Response("Could not load navigation", { status: 404 });
  }

  return [...data, checkedTags, lang, locale];
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const language = form.get("lang");
  const tags = form.getAll("tag");
};

export default function SearchingCoach() {
  const [
    page,
    coaches,
    languages,
    tags,
    navigation,
    checkedTags,
    currentLang,
    locale,
  ] = useLoaderData();
  return (
    <BasicLayout nav={navigation.fields.items} lang="de">
      <div>
        <ContentBlocks content={page.fields.content} locale={locale} />
        <details open={true} className="mx-auto max-w-7xl py-8 px-4">
          <summary>
            <h5 className="inline-block text-xl">Filter anzeigen</h5>
          </summary>
          <Form replace>
            <fieldset className="mt-8">
              <legend className="mb-4 inline-block text-xl">
                Nach Sprache filtern
              </legend>
              {languages.map((lang: string) => (
                <label className="min-h-4 mr-1 mb-1 inline-block" key={lang}>
                  <input
                    className="peer sr-only"
                    type="radio"
                    name="lang"
                    value={lang}
                    defaultChecked={currentLang === lang}
                  />
                  <span className="inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 peer-checked:bg-gray-500 peer-checked:text-white">
                    <span>{lang}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            <fieldset className="mt-8">
              <legend className="mb-4 inline-block text-xl">
                Nach Schlagwort filtern
              </legend>
              {tags.map((tag: string) => (
                <label key={tag}>
                  <input
                    className="peer sr-only"
                    type="checkbox"
                    name="tag"
                    value={tag}
                    defaultChecked={checkedTags.includes(tag)}
                  />
                  <span className="mr-1 mb-1 inline-block cursor-pointer rounded-md border px-2 py-1 peer-checked:bg-gray-500 peer-checked:text-white">
                    {tag}
                  </span>
                </label>
              ))}
            </fieldset>
            <button
              className="font-inherit my-8 inline-flex items-center justify-center rounded-md bg-vsp-500 py-2 px-4 text-white no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 md:text-lg"
              type="submit"
            >
              Filter anwenden
            </button>
          </Form>
        </details>
        <div className="bg-gray-100">
          <section className="mx-auto grid max-w-7xl grid-cols-coachgrid items-start gap-x-6 gap-y-12 py-12 px-4">
            {coaches.map((coach: ICoach) => {
              const { email, name, url, phone, emergency, image, description } =
                coach.fields;
              return (
                <CoachCard
                  key={coach.sys.id}
                  name={name}
                  email={email}
                  url={url}
                  phone={phone}
                  emergency={emergency}
                  image={image}
                >
                  {description && (
                    <ContentfulRichText
                      content={description}
                      withProse={false}
                    />
                  )}
                </CoachCard>
              );
            })}
          </section>
        </div>
      </div>
    </BasicLayout>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <>
      <h1>Oh no!</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </>
  );
}
