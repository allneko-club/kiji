import { HttpResponse, http, HttpResponseResolver } from 'msw';
import { networkDelay } from '../utils';
import { env } from '../env';
import { getServerErrorResponse } from '@/__mocks__/handlers/index';
import { ErrorResponseBody } from '@/__mocks__/types';

type ContactRequestBody = {
  email: string;
  content: string;
};

type ContactResponseBody = {
  message: string;
};

function handleContactRequest(resolver: HttpResponseResolver<never, ContactRequestBody, ContactResponseBody | ErrorResponseBody>) {
  return http.post(`${env.API_URL}/contact`, resolver)
}

export const contactHandlers = [
  handleContactRequest(async () => {
    await networkDelay();

    try {
      return HttpResponse.json({message: "success"});

    } catch (error) {
      console.error(error);
      return getServerErrorResponse();
    }
  }),
];
