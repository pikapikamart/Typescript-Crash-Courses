import * as yup from "yup";


const payload = {
  body: yup.object({
    title: yup.string().required("Title is required"),
    body: yup.string()
      .required("Body content is required")
      .min(120, "Body is too short, body should have at least 120 characters")
  })
};


const params = {
  params: yup.object({
    postId: yup.string().required("PostId is required")
  })
}

export const createPostSchema = yup.object({
  ...payload
});


export const updatePostSchema = yup.object({
  ...params,
  ...payload
});


export const deletePostSchema = yup.object({
  ...params
})