interface requestOptions {
  data?: any,
  noAccessToken?: boolean,
}

type requestType = 'query' | 'body';

interface SwitchData {
  sphereId: string
  stoneId: string,
  type: 'PERCENTAGE' | 'TURN_ON' | 'TURN_OFF'
  percentage?: number,
}

interface StoneSwitchData {
  type: 'PERCENTAGE' | 'TURN_ON' | 'TURN_OFF',
  percentage?: number
}

type timeISOString = string;

interface EnergyMeasurementData {
  stoneId: string, t: timeISOString, energy: number
}
interface EnergyReturnData {
  stoneId: string, timestamp: timeISOString, energyUsage: number
}

type EnergyUsageRange = 'day' | 'week' | 'month' | 'year';

type StoreReply = {
  message: string,
  count: number,
}
