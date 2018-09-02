export const environment = {
    baseUrl: window.location.href.indexOf("localhost") >- 1 ? "http://localhost:54183" : "http://www.charliemcgrathweb.com",
    redirectUri: window.location.href.indexOf("localhost") >- 1 ? "http://localhost:4200/callback" : "http://www.charliemcgrathweb.com/callback",
  };

