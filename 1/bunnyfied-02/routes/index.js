export const postApiOne = async (payload) => {
  const res = await fetch("/api/api_one", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};
