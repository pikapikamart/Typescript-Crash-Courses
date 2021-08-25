import { Express } from "express";
import validateRequest from "../middleware/validateRequest";
import requiresUser from "../middleware/requiresUser";
import { createUserHandler } from "../controller/user.controller";
import { createUserSchema, createUserSessionSchema } from "../schema/user.schema";
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionHandler } from "../controller/session.controller";
import { createPostSchema, updatePostSchema, deletePostSchema } from "../schema/post.schema";
import { createPostHandler, updatePostHandler, getPostHandler, deletePostHandler } from "../controller/post.controller";


export default function(app: Express) {

  // Create User
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Sessions Section
  app.get("/api/sessions", requiresUser, getUserSessionHandler);

  app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);

  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // Posts Sections

  app.post("/api/posts", [requiresUser, validateRequest(createPostSchema)], createPostHandler);

  app.put("/api/posts/:postId", [requiresUser, validateRequest(updatePostSchema)], updatePostHandler);

  app.get('/api/posts/:postId', getPostHandler);

  app.delete("/api/posts/:postId", [requiresUser, validateRequest(deletePostSchema)], deletePostHandler);
}
