export const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      console.log("Error on fetcher", res)
    }
    return res.json()
  })
