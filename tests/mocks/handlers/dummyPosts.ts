import { admin, user } from '@/tests/mocks/handlers/dummyUsers';


export const getDummyPosts  = (params: Record<string, string | number | boolean | null | undefined>) => {
  console.log(params)
  return [
    {
      "id": "2qY_TTiUrM0iYsZs4VxA9",
      "title": "title1",
      "body": "long text 1",
      "createdAt": 1734834215543,
      "public": true,
      "authorId": admin.id,
      "author": admin
    },
    {
      "id": "UCW7OT6i4aEvJUZLGteJl",
      "title": "title2",
      "body": "long text 2",
      "createdAt": 1735133886800,
      "public": true,
      "authorId": admin.id,
      "author": admin
    },
    {
      "id": "O9NZxo8bLokA9EpWndNyz",
      "title": "title3",
      "body": "long text 3",
      "createdAt": 1735288121138,
      "public": true,
      "authorId": user.id,
      "author": user
    }
  ];
}