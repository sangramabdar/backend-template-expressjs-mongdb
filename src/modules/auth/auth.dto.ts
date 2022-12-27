import { Request, Response } from "express";

import * as yup from "yup";
import { BadRequest } from "../../utils/exceptions";
import { trimAllStrings } from "../../utils/utils";

interface SignUpDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginDto {
  email: string;
  password: string;
}

const singupDto = yup.object().shape({
  name: yup
    .string()
    .required("name is required")
    .min(3, "name must contain at least 3 characters"),
  email: yup
    .string()
    .email("email must be valid")
    .required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password must contain between 8 to 20 characters"),
  confirmPassword: yup.string().required("confirmPassword is required"),
});

const loginDto = yup.object().shape({
  email: yup
    .string()
    .email("email must be valid")
    .required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password must contain between 8 to 20 characters"),
});

async function validateLoginDto(req: Request, res: Response, next) {
  try {
    req.body = trimAllStrings(req.body);
    req.body = await loginDto.validate(req.body, {
      stripUnknown: true,
    });

    next();
  } catch (error) {
    error = new BadRequest(error.message);
    next(error);
  }
}

async function validateSignUpDto(req: Request, res: Response, next) {
  try {
    req.body = trimAllStrings(req.body);
    req.body = await singupDto.validate(req.body, {
      stripUnknown: true,
    });

    if (req.body["password"] !== req.body["confirmPassword"]) {
      let error = new BadRequest("password and confirmPassword must be same");
      next(error);
      return;
    }

    delete req.body.confirmPassword;

    next();
  } catch (error) {
    error = new BadRequest(error.message);
    next(error);
  }
}

export { validateSignUpDto, validateLoginDto, SignUpDto, LoginDto };
