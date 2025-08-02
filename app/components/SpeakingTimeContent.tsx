import { Form, useSubmit, useNavigation } from "react-router";
import type {
  ICoach,
  ICoachFields,
  ICoachtag,
  IPage,
  LOCALE_CODE,
} from "../../@types/generated/contentful";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CoachFilterTag from "./CoachFilterTag";
import CoachList from "./CoachList";
import ContentBlocks from "./ContentBlocks";
import ArrowDown from "./icons/ArrowDown";
import FilterIcon from "./icons/FilterIcon";
import Spinner from "./icons/Spinner";
import CoachSearch from "./CoachSearch";
import CoachCard from "./CoachCard";
import ContentfulRichText from "./ContentfulRichText";
import type { EmailTemplate } from "~/utils/contentful";

const QUICK_RESPONSE_TAG_ID = "4dQrja372DDIuqvhTtnGda";

type SpeakingTimeContentProps = {
  page: IPage;
  locale: LOCALE_CODE;
  languages: string[];
  gender: string[];
  checkedGender: string[];
  tags: ICoachtag[];
  currentLang: string;
  availableTagIDs: string[];
  checkedTags: string[];
  coaches: ICoach[];
  coachesAmount: number;
  emailTemplate?: EmailTemplate;
};

export default function SpeakingTimeContent({
  page,
  locale,
  languages,
  gender,
  checkedGender,
  tags,
  currentLang,
  availableTagIDs,
  checkedTags,
  coaches,
  coachesAmount,
  emailTemplate,
}: SpeakingTimeContentProps) {
  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation("searchingCoach");
  const [isActive, setIsActive] = useState(false);
  var timeout: ReturnType<typeof setTimeout>;

  const handleChange = () => {
    if (formRef) {
      // not the best solution as the tags now will timeout for 300ms as well - but with the onchange on the form I could not find another way
      // to debounce the search input to not sent a request for each input .. happy for suggestions
      clearTimeout(timeout);
      timeout = setTimeout(
        () =>
          submit(formRef.current, { replace: true, preventScrollReset: true }),
        300,
      );
    }
  };
  const state = useNavigation();

  // sort tags to ensure the "quick response" one is always the first in the array
  tags.unshift(
    tags.splice(
      tags
        .map(function (tag) {
          return tag.sys.id;
        })
        .indexOf(QUICK_RESPONSE_TAG_ID),
      1,
    )[0],
  );

  return (
    <div>
      <ContentBlocks content={page.fields.content} locale={locale} />
      <Form
        onChange={handleChange}
        ref={formRef}
        method="get"
        id="filter-form"
        className="bg-slate-100"
      >
        <details open={false} className="mx-auto max-w-7xl pt-6 px-4">
          <summary
            className="inline-flex  cursor-pointer items-center hover:text-vsp-500"
            onClick={() => setIsActive(!isActive)}
          >
            <FilterIcon />
            <h5 className="inline-block px-4 text-xl" id="details-filter">
              {t("filter.showFilter")}
            </h5>
            <div
              className={`transition-transform hover:text-vsp-500 ${
                isActive ? "rotate-180" : "rotate-0"
              }`}
            >
              <ArrowDown />
            </div>
          </summary>

          <fieldset className="mt-8">
            <legend className="mb-4 inline-block text-xl">
              {t("filter.language")}
            </legend>
            {languages.map((lang: string) => (
              <CoachFilterTag
                isHighlighted={false}
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

          {/* Gender filter */}

          <fieldset className="mt-8">
            <legend className="mb-4 inline-block text-xl">
              {t("filter.gender")}
            </legend>
            {gender.map((genders: string) => (
              <CoachFilterTag
                isHighlighted={false}
                disabled={false}
                key={genders}
                value={genders}
                name="gender"
                defaultValue={checkedGender.includes(genders)}
                type="checkbox"
              >
                {t(`genderTags.${genders}`)}
              </CoachFilterTag>
            ))}
          </fieldset>

          {/* end Gender filter */}

          <fieldset className="mt-8">
            <legend className="mb-4 inline-block text-xl">
              {t("filter.tag")}
            </legend>
            {tags.map((tag: ICoachtag) => {
              const isHighlighted = tag.sys.id === QUICK_RESPONSE_TAG_ID;
              const isNotSelectable =
                !availableTagIDs.includes(tag.sys.id) &&
                !checkedTags.includes(tag.sys.id);
              return (
                <CoachFilterTag
                  isHighlighted={isHighlighted}
                  disabled={isNotSelectable}
                  key={tag.sys.id}
                  value={tag.sys.id}
                  name="tag"
                  defaultValue={checkedTags.includes(tag.sys.id)}
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
          </div>
        </details>
        <div className="py-6 px-4 max-w-7xl mx-auto flex justify-end lg:justify-between items-center flex-wrap">
          <CoachSearch />
          <div className="text-m font-semibold text-slate-700">
            {coachesAmount ? `${coachesAmount} ${t("result")}` : t("noResult")}
          </div>
        </div>
      </Form>

      <div className="relative">
        {state.state === "loading" && (
          <div className="absolute inset-0 z-50 flex items-start justify-center bg-white bg-opacity-50">
            <div className="mt-8">
              <Spinner />
            </div>
          </div>
        )}
        <CoachList>
          {coaches.map((coach: ICoach) => {
            const {
              email,
              name,
              url,
              phone,
              emergency,
              image,
              description,
              languages,
              gender,
              mhfaTraining,
              completedMhfaTraining,
            } = coach.fields as ICoachFields;
            return (
              <CoachCard
                key={coach.sys.id}
                name={name}
                email={email}
                url={url}
                phone={phone}
                emergency={emergency}
                image={image}
                languages={languages}
                gender={gender}
                mhfaTraining={mhfaTraining}
                completedMhfaTraining={completedMhfaTraining}
                message={emailTemplate}
              >
                {description && (
                  <ContentfulRichText content={description} withProse={false} />
                )}
              </CoachCard>
            );
          })}
        </CoachList>
      </div>
    </div>
  );
}
