import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET_KEY;

const auth = async (req, res, next) => {
  // console.log("Entering middleware");
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      console.log("decoded data: ", decodedData);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next(); //if valid user, proceed.
  } catch (error) {
    console.log(error);
  }
};

export default auth;
