import { EMAIL_REGEX } from '@constants/reg';
import { CreateBookInput, CreateCategoryInput, CreateFeatureInput, MutationLoginInput, RegisterInput, UpdateBookInput, UpdateCategoryInput, UpdateFeatureInput, VerifyEmailInput } from '@graphql/types/generated-graphql-types';
import { isDate, isNaN } from 'lodash';

export const validatorRegister = (input: RegisterInput) => {
  const { email, password, firstName, lastName } = input;

  let error: any = {};
  if (firstName.trim().length === 0) {
    error.message = 'firstName is required';
  } else if (lastName.trim().length === 0) {
    error.message = 'lastName is required';
  } else if (email.trim().length === 0) {
    error.message = 'email is required';
  } else if (!email.match(EMAIL_REGEX)) {
    error.message = 'email is invalid';
  } else if (password.trim().length === 0) {
    error.message = 'password is required';
  } else if (password.trim().length < 6) {
    error.message = 'password must be at least 6 characters';
  } else error = {};

  return { error, isValid: Object.keys(error).length < 1 };
};

export const validatorLogin = (input: MutationLoginInput) => {
  const { email, password } = input;

  let error: any = {};
  if (email.trim().length === 0) {
    error.message = 'email is required';
  } else if (!email.match(EMAIL_REGEX)) {
    error.message = 'email is invalid';
  } else if (password.trim().length === 0) {
    error.message = 'password is required';
  } else if (password.trim().length < 6) {
    error.message = 'password must be at least 6 characters';
  } else error = {};

  return { error, isValid: Object.keys(error).length < 1 };
};

export const validatorCreatBook = (input: CreateBookInput | UpdateBookInput) => {
  const { description, title, isbn, price, relasedDate } = input;

  let error: any = {};
  if (title.trim().length === 0) {
    error.message = 'title is required';
  } else if (title.trim().length > 255) {
    error.message = ' Max 255 alphanumeric characters';
  } else if (description.trim().length === 0) {
    error.message = 'description is required';
  } else if (description.trim().length > 255) {
    error.message = 'Max 255 alphanumeric character';
  } else if (isbn.trim().length === 0) {
    error.message = 'isbn is required';
  } else if (description.trim().length > 255) {
    error.message = 'Max 255 alphanumeric character';
  } else if (isNaN(price)) {
    error.message = 'Price must be a number';
  } else error = {};
  // else if (!isDate(relasedDate)) {
  //   error.message = 'Relased Date must be a Date';
  // }
  return { error, isValid: Object.keys(error).length < 1 };
};

export const validatorVerifyEmail = (input: VerifyEmailInput) => {
  const { email, otp } = input;
  let error: any = {};
  if (email.trim().length === 0) {
    error.message = 'email is required';
  } else if (!email.match(EMAIL_REGEX)) {
    error.message = 'email is invalid';
  } else if (otp.trim().length === 0) {
    error.message = 'password is required';
  } else if (otp.trim().length !== 4) {
    error.message = 'otp is invalid';
  } else error = {};
  return { error, isValid: Object.keys(error).length < 1 };
};

export const validatorResendOTP = (email: string) => {
  let error: any = {};
  if (email.trim().length === 0) {
    error.message = 'email is required';
  } else if (!email.match(EMAIL_REGEX)) {
    error.message = 'email is invalid';
  }
  return { error, isValid: Object.keys(error).length < 1 };
};

export const validatorCreateCategory = (input: CreateCategoryInput) => {
  const { description, name } = input;

  let error: any = {};
  if (name.trim().length === 0) {
    error.message = 'name is required';
  } else if (name.trim().length > 100) {
    error.message = ' Max 100 alphanumeric characters';
  } else if (description.trim().length === 0) {
    error.message = 'description is required';
  } else if (description.trim().length > 255) {
    error.message = 'Max 255 alphanumeric character';
  } else error = {};

  return { error, isValid: Object.keys(error).length < 1 };
};

export const validatorUpdateCategory = (input: UpdateCategoryInput) => {
  const { description, name } = input;

  let error: any = {};
  if (name.trim().length === 0) {
    error.message = 'name is required';
  } else if (name.trim().length > 100) {
    error.message = ' Max 100 alphanumeric characters';
  } else if (description.trim().length === 0) {
    error.message = 'description is required';
  } else if (description.trim().length > 255) {
    error.message = 'Max 255 alphanumeric character';
  } else error = {};

  return { error, isValid: Object.keys(error).length < 1 };
};

export const validatorFeatureInput = (input: CreateFeatureInput | UpdateFeatureInput) => {
  const { title, description, coverPhoto, books, type, link } = input;
  let error: any = {};
  if (title.trim().length === 0) {
    error.message = 'title is required';
  } else if (title.trim().length > 255) {
    error.message = ' Max 255 alphanumeric characters';
  } else if (description.trim().length === 0) {
    error.message = 'description is required';
  } else if (description.trim().length > 255) {
    error.message = 'Max 255 alphanumeric character';
  } else if (!coverPhoto) {
    error.message = 'coverPhoto is required';
  } else if (!type) {
    error.message = 'type is required';
  } else if (!link) {
    error.message = 'link is required';
  } else error = {};
  // else if (!isDate(relasedDate)) {
  //   error.message = 'Relased Date must be a Date';
  // }
  return { error, isValid: Object.keys(error).length < 1 };
};
