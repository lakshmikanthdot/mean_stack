// web scrapping
const API_URL = "https://jsonplaceholder.typicode.com/users/1";

// data transformation

// received data from the API
type PlaceholderUser = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
};

// but my application is need this type of data
type PublicUser = {
  id: number;
  name: string;
  email: string;
  company: string;
};

function transformUser(rawData: PlaceholderUser): PublicUser {
  return {
    id: rawData.id,
    name: rawData.name,
    email: rawData.email,
    company: rawData.company.name,
  };
}

async function fetchExternalUser(): Promise<void> {
  // abortcontroller is used to cancel the request if it takes too long
  const controller = new AbortController();

  const timeOut = setTimeout(() => {
    controller.abort();
  }, 5000);
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(`upstream api failed with http ${response.status}`);
      return;
    }

    const rawUser = (await response.json()) as PlaceholderUser;

    const user = transformUser(rawUser);
    console.log(user);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("request failed becaise upstream api took so long");
      return;
    }
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("External api failed", message);
  } finally {
    clearTimeout(timeOut);
  }
}
fetchExternalUser();
