"use client";

import FromSubmit from "@/components/FromSubmit";
import { useFormState } from "react-dom";
import { createPost } from "@/lib/actions";
// adding Image

export default function NewPostPage() {
  const [state, formAction] = useFormState(createPost, {});

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
        </p>
        <p className="form-actions">
          <FromSubmit />
        </p>

        {/* {state?.errors.map((error) => (
          <li key={error}>{error}</li>
        ))} */}
      </form>
    </>
  );
}
