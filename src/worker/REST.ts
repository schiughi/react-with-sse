export const post = (url: string, content: object) =>
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(content)
  });
