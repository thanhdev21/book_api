import { MutationLoginInput, RegisterInput } from '@graphql/types/generated-graphql-types';
import e from 'express';

export const validatorRegister = (input: RegisterInput) => {
  const { email, password, firstName, lastName } = input;
  const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let error: any = {};
  if (firstName.trim().length === 0) {
    error.message = 'firstName is required';
  } else if (lastName.trim().length === 0) {
    error.message = 'lastName is required';
  } else if (email.trim().length === 0) {
    error.message = 'email is required';
  } else if (!email.match(emailReg)) {
    error.message = 'email is invalid';
  } else if (password.trim().length === 0) {
    error.message = 'password is required';
  } else if (password.trim().length < 6) {
    error.message = 'password must be at least 6 characters';
  } else error = {};

  return { error, isValid: Object.keys(error).length < 1 };
};


export const validatorLogin = (input: MutationLoginInput)=>{
  const {email, password}= input
  const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let error: any = {};
  if (email.trim().length === 0) {
    error.message = 'email is required';
  } else if (!email.match(emailReg)) {
    error.message = 'email is invalid';
  } else if (password.trim().length === 0) {
    error.message = 'password is required';
  } else if (password.trim().length < 6) {
    error.message = 'password must be at least 6 characters';
  } else error = {};

  return { error, isValid: Object.keys(error).length < 1 };
}