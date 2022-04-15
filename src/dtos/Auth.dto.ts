import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,20}/,
    {
      message:
        'passsword must contain at least one uppercase, one lowercase, one symbol, one number and must be between 8-20 characters ',
    },
  )
  @ApiProperty({
    type: String,
    description:
      'Has to match a regular expression: /(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-?;,./{}|":<>[]\\\' ~_]).{8,20}/',
    example: 'ABcd1234.',
  })
  password: string;
}

// export class ForgotPasswordDto {
//   @IsNotEmpty()
//   @IsString()
//   @IsEmail()
//   @ApiProperty({ type: String, description: 'email' })
//   email: string;
// }

// export class CompleteResetDto {
//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty({ type: String, description: 'reset code' })
//   code: string;

//   @IsString()
//   @MinLength(8)
//   @MaxLength(20)
//   @Matches(
//     /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,20}/,
//     {
//       message:
//         'passsword must contain at least one uppercase, one lowercase, one symbol, one number and must be between 8-20 characters ',
//     },
//   )
//   @ApiProperty({
//     type: String,
//     description:
//       'Has to match a regular expression: /(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-?;,./{}|":<>[]\\\' ~_]).{8,20}/',
//     example: 'ABcd1234.',
//   })
//   newPassword: string;
// }
