interface requestOptions {
  data?: any,
  noAccessToken?: boolean,
}

type requestType = 'query' | 'body';

interface SwitchPair {
  sphereId: string
  stoneId: string,
  state: number,
}