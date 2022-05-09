import { Form, useSubmit, useTransition } from "@remix-run/react";
import type {
  ICoach,
  ICoachtag,
  IPage,
  LOCALE_CODE,
} from "@types/generated/contentful";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import CoachFilterTag from "./CoachFilterTag";
import CoachList from "./CoachList";
import ContentBlocks from "./ContentBlocks";

type SpeakingTimeContentProps = {
  page: IPage;
  locale: LOCALE_CODE;
  languages: string[];
  tags: ICoachtag[];
  currentLang: string;
  availableTagIDs: string[];
  checkedTags: string[];
  coaches: ICoach[];
  coachesAmount: number;
};

export default function SpeakingTimeContent({
  page,
  locale,
  languages,
  tags,
  currentLang,
  availableTagIDs,
  checkedTags,
  coaches,
  coachesAmount,
}: SpeakingTimeContentProps) {
  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation("searchingCoach");

  const handleChange = () => {
    if (formRef) {
      submit(formRef.current, { replace: true });
    }
  };
  const state = useTransition();
  return (
    <div>
      <ContentBlocks content={page.fields.content} locale={locale} />
      <details open={true} className="mx-auto max-w-7xl py-8 px-4">
        <summary>
          <h5 className="inline-block text-xl">{t("filter.showFilter")}</h5>
        </summary>
        <Form
          onChange={handleChange}
          ref={formRef}
          method="get"
          id="filter-form"
          className="flex flex-col gap-2"
        >
          <fieldset className="mt-8">
            <legend className="mb-4 inline-block text-xl">
              {t("filter.language")}
            </legend>
            {languages.map((lang: string) => (
              <CoachFilterTag
                disabled={false}
                key={lang}
                value={lang}
                name="lang"
                defaultValue={currentLang === lang}
                type="radio"
              >
                {t(`languageTags.${lang}`)}
              </CoachFilterTag>
            ))}
          </fieldset>
          <fieldset className="mt-8">
            <legend className="mb-4 inline-block text-xl">
              {t("filter.tag")}
            </legend>
            {tags.map((tag: ICoachtag) => {
              const isNotSelectable =
                !availableTagIDs.includes(tag.sys.id) &&
                !checkedTags.includes(tag.fields.tag);
              return (
                <CoachFilterTag
                  disabled={isNotSelectable}
                  key={tag.sys.id}
                  value={tag.fields.tag}
                  name="tag"
                  defaultValue={checkedTags.includes(tag.fields.tag)}
                  type="checkbox"
                >
                  {tag.fields.tag}
                </CoachFilterTag>
              );
            })}
          </fieldset>
          <div className="flex items-center gap-4">
            <noscript>
              <button
                className="font-inherit my-8 inline-flex items-center justify-center rounded-md bg-vsp-500 py-2 px-4 text-white no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 disabled:pointer-events-none disabled:bg-vsp-200 md:text-lg"
                type="submit"
                disabled={state.state === "submitting"}
              >
                {t("filter.submitCta")}
              </button>
            </noscript>
            <span className="py-2 px-4 text-sm text-slate-400">
              {coachesAmount
                ? `${coachesAmount} ${t("result")}`
                : t("noResult")}
            </span>
          </div>
        </Form>
      </details>
      <CoachList coaches={coaches} />
    </div>
  );
}
