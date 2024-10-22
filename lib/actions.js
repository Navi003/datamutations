"use server";

import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { redirect } from "next/navigation";
import { uploadImage } from "./cloudinary";
import { revalidatePath } from "next/cache";

export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];
  let imageUrl;
  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!image) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error("Image uplaod Failed");
  }

  await storePost({
    imageUrl,
    title,
    content,
    userId: 1,
  });

  redirect("/feed");
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);

  //if we change Data which is visible to user and based on base
  revalidatePath("/feed");
}
