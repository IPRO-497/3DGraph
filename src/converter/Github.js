export const convert = (data) => {
  const parsedData = data.data.user.contributionsCollection.contributionCalendar.weeks
  const newData = []
  for(const days of parsedData){
    newData.push(days.contributionDays.map(count => count.contributionCount))
  }
  return newData
}