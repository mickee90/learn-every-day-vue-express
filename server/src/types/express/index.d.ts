declare namespace Express {
  interface Request {
    user?: Post;
    logout(): any;
  }
}
