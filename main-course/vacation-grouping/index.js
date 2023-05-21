import fs from "fs";

const data = JSON.parse(fs.readFileSync("vacation-grouping/data.json", "utf-8"));

function groupVacations(data) {
  const vacationsByUser = [];
  for (const vacation of data) {
    const i = vacationsByUser.findIndex(
      (user) => user.userId === vacation.user._id
    );
    if (i >= 0) {
      vacationsByUser[i].holidayDates.push({
        startDate: vacation.startDate,
        endDate: vacation.endDate,
      });
    } else {
      vacationsByUser.push({
        userId: vacation.user._id,
        name: vacation.user.name,
        holidayDates: [
          {
            startDate: vacation.startDate,
            endDate: vacation.endDate,
          },
        ],
      });
    }
  }
  return vacationsByUser;
}

const groupedVacations = groupVacations(data);

fs.writeFileSync(
  "vacation-grouping/prettified-data.json",
  JSON.stringify(groupedVacations, null, 2)
);

console.log(groupedVacations);