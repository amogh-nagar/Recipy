import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { S3 } from "@aws-sdk/client-s3";
import { v4 } from "uuid";
const db = sql("meals.db");
const s3 = new S3({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
export async function getMeals() {
  return db
    .prepare(
      `
        SELECT * FROM meals
    `
    )
    .all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, {
    lower: true,
  });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}-${v4()}.${extension}`;
  const bufferedImage = await meal.image.arrayBuffer();
  await s3.putObject({
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });
  meal.image = fileName;
  db.prepare(
    `
      INSERT INTO meals (
          title, summary, instructions, creator, creator_email, slug, image
      )
      VALUES (@title, @summary, @instructions, @creator, @creator_email, @slug, @image)
  `
  ).run(meal);
}
