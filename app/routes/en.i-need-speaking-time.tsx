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

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const lang = searchParams.get("lang") || "en";
  const checkedTags = searchParams.getAll("tag");

  const page = getPageById(pageIds.SEARCH_HELP);
  const coaches: Promise<ICoach[]> = getCoaches(lang);
  const languages = getLanguages();
  const tags = getTags();
  const navigation = getMainNav("en");

  const data = await Promise.all([page, coaches, languages, tags, navigation]);

  if (!coaches) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  if (!navigation) {
    throw new Response("Could not load navigation", { status: 404 });
  }

  return [...data, checkedTags, lang];
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const language = form.get("lang");
};

export default function SearchingCoach() {
  const [page, coaches, languages, tags, navigation, checkedTags, currentLang] =
    useLoaderData();
  return (
    <BasicLayout nav={navigation.fields.items} lang="en">
      <div>
        <ContentBlocks content={page.fields.content} />
        <details open={true} className="py-8 px-4 max-w-7xl mx-auto">
          <summary>
            <h5 className="inline-block text-xl">Show filters</h5>
          </summary>
          <Form>
            <fieldset className="mt-8">
              <legend className="inline-block text-xl mb-4">
                Filter by language
              </legend>
              {languages.map((lang: string) => (
                <label className="min-h-4 inline-block mr-1 mb-1" key={lang}>
                  <input
                    className="sr-only peer"
                    type="radio"
                    name="lang"
                    value={lang}
                    defaultChecked={currentLang === lang}
                  />
                  <span className="px-2 py-1 inline-flex gap-1 items-center rounded-md border peer-checked:text-fuchsia-500">
                    {currentLang === lang ? (
                      <CheckIcon className="w-4 h-4" />
                    ) : null}
                    <span>{lang}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            <fieldset className="mt-8">
              <legend className="inline-block text-xl mb-4">
                Filter by tags
              </legend>
              {tags.map((tag: string) => (
                <label key={tag}>
                  <input
                    className="sr-only peer"
                    type="checkbox"
                    name="tag"
                    value={tag}
                    defaultChecked={checkedTags.includes(tag)}
                  />
                  <span className="px-2 py-1 inline-block rounded-md mr-1 mb-1 border peer-checked:text-fuchsia-500">
                    {tag}
                  </span>
                </label>
              ))}
            </fieldset>
            <button
              className="inline-flex justify-center text-white items-center font-inherit rounded-md py-2 px-4 my-8 no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 md:text-lg bg-vsp-500"
              type="submit"
            >
              Apply filter
            </button>
          </Form>
        </details>
        <div className="bg-gray-100">
          <section className="grid grid-cols-coachgrid items-start gap-x-6 gap-y-12 py-12 px-4 max-w-7xl mx-auto">
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
