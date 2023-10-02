
export function getSkillLevelGrade(string) {
    let [name, rest] = string.split(" Lv.");
    let g = "0";
    let l = "0";
    if (rest.includes("Grade")) {
        [l, g] = rest
            .substring(0, rest.length - 1)
            .split("(Grade ");
    } else {
        l = rest.split("Lv.")[0];
    }

    let grade = parseInt(g)
    let level = parseInt(l);
    return {name, level, grade};
}