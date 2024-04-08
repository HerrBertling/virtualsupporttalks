import { type ITeamSectionFields } from "../../../@types/generated/contentful";
import CleverLink from "../CleverLink";
import ContentfulRichText from "../ContentfulRichText";

export default function ContentBlockTeamSection({
  title,
  description,
  teamMembers,
}: ITeamSectionFields) {
  const sanitizedTeamMembers = teamMembers.filter((member) => !!member.fields);
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">{description}</p>
        </div>
        <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none">
          {sanitizedTeamMembers.map((person) => (
            <li key={person.sys.id} className="flex flex-col gap-6 xl:flex-row">
              <img
                className="aspect-square w-full lg:aspect-[4/5] lg:w-52 flex-none rounded-2xl object-cover"
                src={person.fields.image.fields.file.url}
                alt=""
              />
              <div className="flex-auto">
                <div className="mb-2">
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {person.fields.firstname} {person.fields.lastname}
                  </h3>
                  {person.fields.position && (
                    <p className="text-base leading-7 text-slate-600">
                      {person.fields.position}
                    </p>
                  )}
                </div>
                <ContentfulRichText content={person.fields.content} />
                {person.fields.url && (
                  <p>
                    <CleverLink to={person.fields.url}>Website</CleverLink>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
