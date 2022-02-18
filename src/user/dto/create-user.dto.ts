import { isNotBlank } from 'src/utils/costum_validators';

export class CreateUserDto {
  @isNotBlank()
  name: string;

  @isNotBlank()
  surname: string;

  @isNotBlank()
  username: string;
}
