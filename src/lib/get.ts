const ENDPOINT =
  "https://atlas.auspic.es/graph/f18108f4-e55e-46b6-9a6a-cb4820e60592";

const QUERY = `
  query($criteria: JSON!) {
    innerVoice: object {
      ... on Collection {
        contents(metadata: $criteria) {
          metadata
          entity {
            ... on Text {
              name
              body
            }
          }
        }
      }
    }
  }
`;

export type Response = {
  metadata: Partial<{ id: string }>;
  entity: {
    name: string;
    body: string;
  };
};

export const get = async (id: string): Promise<Response> => {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { criteria: { id } },
    }),
  });

  const {
    data: {
      innerVoice: { contents },
    },
  } = await res.json();

  const [content] = contents;

  return content;
};
