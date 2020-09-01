interface requestOptions {
  data?: any,
  noAccessToken?: boolean,
}

type requestType = 'query' | 'body';

interface SwitchData {
  sphereId: string
  stoneId: string,
  type: 'SET_STATE' | 'TURN_ON' | 'TURN_OFF'
  state?: number,
}