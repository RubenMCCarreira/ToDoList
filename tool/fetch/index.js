export const GET = async (uri, headers = {}) => {
  let payload = await fetch(uri, {
    method: 'GET',
    headers
  });
  payload = await payload.json();

  return payload;
};

export const PUT = async (uri, data, headers = {}) => {
  let payload = await fetch(uri, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(data)
  });
  payload = await payload.json();

  return payload;
};

export const POST = async (uri, data, headers = {}) => {
  let payload = await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(data)
  });
  payload = await payload.json();

  return payload;
};

export const DELETE = async (uri, headers = {}) => {
  let payload = await fetch(uri, {
    method: 'DELETE',
    headers
  });
  payload = await payload.json();

  return payload;
};
