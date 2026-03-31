exports.handler = async (event) => {
  const { path: redditPath, ...params } = event.queryStringParameters || {};

  if (!redditPath) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing path' }) };
  }

  const query = new URLSearchParams(params).toString();
  const url = `https://www.reddit.com${redditPath}?${query}&raw_json=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RedditSleuth/1.0 (web app)',
        'Accept': 'application/json',
      }
    });

    const data = await response.text();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
