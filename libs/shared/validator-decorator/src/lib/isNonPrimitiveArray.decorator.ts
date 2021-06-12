import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';

/**
 * Check if array is not primitive array
 */
export function IsNonPrimitiveArray(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'IsNonPrimitiveArray',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsNonPrimitiveArray,
    });
  };
}

@ValidatorConstraint({ name: 'IsNonPrimitiveArray' })
export class IsNonPrimitiveArrayConstraint
  implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(value: any, _args: ValidationArguments) {
    return (
      Array.isArray(value) &&
      value.reduce(
        (a, b) => a && typeof b === 'object' && !Array.isArray(b),
        true
      )
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is primitive array`;
  }
}
