const GNEWS_ENDPOINT = "https://gnews.io/api/v4/top-headlines";

exports.handler = async (event) => {
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        errors: ["GNEWS_API_KEY is missing on the server."],
      }),
    };
  }

  const params = new URLSearchParams({
    lang: event.queryStringParameters?.lang || "en",
    country: event.queryStringParameters?.country || "us",
    topic: event.queryStringParameters?.topic || "general",
    max: event.queryStringParameters?.max || "5",
    page: event.queryStringParameters?.page || "1",
    token: apiKey,
  });

  try {
    const response = await fetch(`${GNEWS_ENDPOINT}?${params.toString()}`);
    const body = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json",
        "Cache-Control": "public, max-age=300",
      },
      body,
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        errors: [`Could not reach GNews from the server: ${error.message}`],
      }),
    };
  }
};
