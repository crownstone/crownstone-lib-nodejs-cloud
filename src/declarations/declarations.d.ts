interface requestOptions {
  data?: any,
  background?: boolean,
  noAccessToken?: boolean,
}

type requestType = 'query' | 'body';