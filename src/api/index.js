const BASE_URL = `https://swapi.dev/api`;

export const getUser = async (username) => {
  let query = fetch(`${BASE_URL}/people/?search=${username}`).then((response) =>
    response.json()
  );

  return query;
};

export const getData = async (url) => {
  let query = fetch(`${url}`).then((response) => response.json());

  return query;
};
