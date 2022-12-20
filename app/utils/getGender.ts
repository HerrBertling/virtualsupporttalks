export default function getGender(gender: string[] | undefined) {
  const genderTags = {
    divers: "Divers",
    männlich: "Männlich",
    weiblich: "Weiblich",
  };

  const result: string[] = [];

  gender
    ? gender.forEach((gender) => {
        result.push(genderTags[gender as keyof typeof genderTags]);
      })
    : result.push("gender");

  return [...new Set(result)];
}
