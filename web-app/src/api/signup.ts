import CreateUserDto from '../dtos/create-user.dto';

export const signupRequest = async (createUserDto: CreateUserDto) => {
  const url: string = '/api/Registration';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createUserDto),
  });

  return response;
};
