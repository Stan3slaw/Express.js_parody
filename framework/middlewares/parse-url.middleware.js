module.exports = (baseUrl) => (req) => {
  const parsedUrl = new URL(req.url, baseUrl);
  const params = {};

  parsedUrl.searchParams.forEach((value, key) => {
    params[key] = value;

    return params;
  });

  req.pathname = parsedUrl.pathname;
  req.params = params;
};
