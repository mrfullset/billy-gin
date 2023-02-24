import { Request } from "express";

const secret = process.env.SECRET!;

export default (req: Request): boolean => {
  const header = req.header("Authorization");
  if (!header) {
    return false;
  }
  const [bearer, userSecret] = header.split(" ");
  return bearer === "Bearer" && userSecret === secret;
};
