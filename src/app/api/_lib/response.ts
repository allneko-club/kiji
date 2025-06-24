export const notFoundResponse = ({
  cache = 'private, no-store',
  details = [],
}: {
  cache?: string;
  details?: string[];
}) => {
  return Response.json(
    {
      error: {
        code: 404,
        message: 'Not Found',
        details,
      },
    },
    {
      status: 404,
      headers: { 'Cache-Control': cache },
    },
  );
};
