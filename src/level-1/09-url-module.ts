// apis
// to work with urls
// backend development - we need
// protocol information
// which host name we are using
// we need path
// we need query parameters

// https://api.example.com/users?page-2&limit=10

function runUrlDemo(): void {
  // ?? how to create a url object from url string
  const apiUrl = new URL(
    "https://api.google.com/users?page=2&limit=10&sort=latest",
  );
  //   console.log(apiUrl); // url object
  //   URL {
  //   href: 'https://api.google.com/users?page=2&limit=10&sort=latest',
  //   origin: 'https://api.google.com',
  //   protocol: 'https:',
  //   username: '',
  //   password: '',
  //   host: 'api.google.com',
  //   hostname: 'api.google.com',
  //   port: '',
  //   pathname: '/users',
  //   search: '?page=2&limit=10&sort=latest',
  //   searchParams: URLSearchParams { 'page' => '2', 'limit' => '10', 'sort' => 'latest' },
  //   hash: ''
  // }
  console.log("fullUrl: ", apiUrl.href); // fullUrl:  https://api.google.com/users?page=2&limit=10&sort=latest
  console.log("protocol: ", apiUrl.protocol); // protocol: https:
  console.log("host : ", apiUrl.host); // host: api.google.com
  console.log("hostname: ", apiUrl.hostname); // hostname: api.google.com
  console.log("pathname: ", apiUrl.pathname); // pathname: /users
  console.log("search: ", apiUrl.search); // search: ?page=2&limit=10&sort=latest
  console.log("searchParams: ", apiUrl.searchParams); //   searchParams:  URLSearchParams { 'page' => '2', 'limit' => '10', 'sort' => 'latest' }

  // most important part - filters , search and sort
  // search -> ? what are the query parameters
  // ?page=2 here key is page and value is 2
  // we can get the query parameters using get method of searchParams
  const page = apiUrl.searchParams.get("page");
  const limit = apiUrl.searchParams.get("limit");
  const sort = apiUrl.searchParams.get("sort");
  console.log(page, limit, sort); // 2 10 latest

  // updated the query parameters using set method
  apiUrl.searchParams.set("page", "29");
  apiUrl.searchParams.set("limit", "25");
  console.log(apiUrl.href); // https://api.google.com/users?page=29&limit=25&sort=latest

  // urlSerachParams -> build query string
  const queryParams = new URLSearchParams({
    search: "node js",
    page: "2",
    limit: "5",
  });
  console.log(queryParams.toString()); // search=node+js&page=2&limit=5
}
runUrlDemo();
