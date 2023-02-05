export const convert = (data, year) => {
  const newData = []
  const firstDate = new Date("Jan 1 2022").getTime()
  const lastDate = new Date("Dec 31 2022").getTime()
  const count = 86400000
  let date = new Date("Jan 1 2022").getDay()
  let week = 0
  let day = 0
  let timezone = firstDate + day * count
  const parsedData = JSON.parse(data.data.matchedUser.userCalendar.submissionCalendar)
  const updateTime = () => {
    day++
    if(date !== 6)date++
    else{
      date = 0
      week++
    }
    timezone = firstDate + day * count
  }
  while(timezone <= lastDate){
    if(!newData[week]?.length)newData.push(new Array(7).fill(0))
    if(parsedData[(timezone - 21600000)/1000])newData[week][date] = parsedData[(timezone - 21600000)/1000]
    updateTime()
  }
  return newData
}