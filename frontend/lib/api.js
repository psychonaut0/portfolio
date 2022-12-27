import qs from "qs";

export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}


export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${process.env.STRAPI_TOKEN}`
    },
    ...options,
  };

  const queryString = qs.stringify(urlParamsObject, {
    encodeValuesOnly: true,
  });
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  console.log(requestUrl)
  const response = await fetch(requestUrl, mergedOptions);
  

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    
  }
  const data = await response.json();
  return data;
}
