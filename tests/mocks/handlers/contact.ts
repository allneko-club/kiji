import { HttpResponse, http, HttpResponseResolver } from 'msw';
import { networkDelay } from '../utils';
import { env } from '../env';

type ContactBody = {
  email: string;
  content: string;
};

// todo responseのtype
function handleContactRequest(resolver: HttpResponseResolver<never, ContactBody, any>) {
  return http.post(`${env.API_URL}/contact`, resolver)
}

export const contactHandlers = [
  handleContactRequest(async () => {
    await networkDelay();

    try {
      return HttpResponse.json({});

    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
