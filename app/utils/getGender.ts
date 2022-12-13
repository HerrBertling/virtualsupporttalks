export default function getGender(gender: string[] | undefined) {
  const genderTags = {
    Diverse: "Diverse",
    Männlich: "Männlich",
    Weiblich: "Weiblich",
  };

  const result: string[] = [];

  gender
    ? gender.forEach((gender) => {
        result.push(genderTags[gender as keyof typeof genderTags]);
      })
    : result.push("gender");

  return [...new Set(result)];
}
