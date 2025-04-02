import BadRequestError from "@/errors/BadRequestError";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "cv-file/");
  },
  filename: function (req, file, cb) {
    cb(null, "Nika_Nishnianidze.pdf");
  },
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else if (file.fieldname !== "cv") {
    cb(
      new BadRequestError({
        message: "Field name should be cv",
      })
    );
  } else {
    cb(
      new BadRequestError({
        message: "Only PDF files are allowed",
      })
    );
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
