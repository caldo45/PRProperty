export const environment = {
    baseUrl: window.location.href.indexOf("localhost") >- 1 ? "http://localhost:54183" : "https://www.charliemcgrathweb.com",
    redirectUri: window.location.href.indexOf("localhost") >- 1 ? "http://localhost:4200/callback" : "https://www.charliemcgrathweb.com/callback",
    imageRoot: window.location.href.indexOf("localhost") >- 1 ? "http://localhost:54183/uploads/" : "https://www.charliemcgrathweb.com/uploads/"
  };

