import CONFIG from "@/config";
import CustomError from "@/errors";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { ZodError } from "zod";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handled errors
  if (err instanceof CustomError) {
    const { statusCode, errors, logging } = err;
    const logger = () => {
      console.error(
        JSON.stringify(
          {
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          },
          null,
          2
        )
      );
    };
    if (CONFIG.node_env === "production") {
      logger();
    } else {
      if (logging) {
        logger();
      }
    }

    return res.status(statusCode).json({ errors });
  }

  if (
    err instanceof multer.MulterError &&
    err.code === "LIMIT_UNEXPECTED_FILE"
  ) {
    return res.status(400).json({
      errors: [{ message: "Field name should be cv" }],
    });
  }
  if (err instanceof ZodError) {
    const formatedError = err.format() as any;
    const errors: { field: string; message: string }[] = [];
    for (const key of Object.keys(formatedError)) {
      if (key !== "_errors") {
        errors.push({
          field: key,
          message: formatedError[key]._errors[0],
        });
      }
    }

    return res.status(400).json({
      errors: errors.map((issue) => {
        return {
          field: issue.field,
          message: issue.message,
        };
      }),
    });
  }

  // Unhandled errors
  console.log(JSON.stringify(err.message, null, 2));
  console.log(JSON.stringify(err.name, null, 2));
  console.log(JSON.stringify(err.stack, null, 2));
  console.error(JSON.stringify(err, null, 2));
  console.log(JSON.stringify(err, null, 2));
  return res
    .status(500)
    .json({ errors: [{ message: "Something went wrong" }] });
};

export default errorHandler;
