interface mountNewsPayload {
  type: "everything" | "sources" | "top-headlines";
  language: string;
  q: string | null;
  from?: string | null;
  to?: string | null;
  country?: string | null;
  sources?: string[] | null;
  category?: string | null;
  sortBy?: string | null;
  page?: number | null;
}

export const mountNewsQuery = (payload: mountNewsPayload): string => {
  let query: string = ``;
  const entries: [string, any][] = Object.entries(payload);

  query += `${payload.type}?`;

  entries.forEach((entry, idx) => {
    if (entry?.[1] instanceof Array && entry[1]) {
      let temp = "sources=";
      for (let i = 0; i < entry[1].length; i++) {
        temp += `${i === 0 ? "" : ","}${entry[1][i]}`;
      }
      query += temp;
    } else if (typeof entry?.[1] === "string" && entry?.[0] !== "type") {
      query += `${idx === 1 ? "" : "&"}${entry[0]}=${entry[1]}`;
    }
    return;
  });

  return (
    `${process.env.NEWS_API_BASE_URL}` +
    query +
    `&apiKey=${process.env.NEWS_API_KEY}`
  );
};
