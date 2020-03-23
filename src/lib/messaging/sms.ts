import { getConfig } from '../../config/config';
import * as AfricasTalking from 'africastalking';
import { logger } from '../../shared/logger';

const { username, apiKey } = getConfig().at;

const options = { apiKey, username };

const smsService = AfricasTalking.default(options).SMS;

export const sendSms = async (smsDetails: { to: string, message: string, from?: string }) => {
  logger.info('something happended'); try {
    const response = await smsService.send(smsDetails);
    console.log(response);
  } catch(error) {
    console.log('error sending sms', error);
  }
};
