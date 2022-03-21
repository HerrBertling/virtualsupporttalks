import { ICoach } from "../../@types/generated/contentful";
import CoachCard from "./CoachCard";
import ContentfulRichText from "./ContentfulRichText";

export default function CoachList({ coaches }: { coaches: ICoach[] }) {
  return (
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
                <ContentfulRichText content={description} withProse={false} />
              )}
            </CoachCard>
          );
        })}
      </section>
    </div>
  );
}
