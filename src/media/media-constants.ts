// TODO: Move consts to `admin-project-form-constants.ts`

export const MEDIA_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MEDIA_MAX_FILE_SIZE_MB = 5;

const MEDIA_EXTENSIONS = {
  PNG: "png",
  JPG: "jpg",
  JPEG: "jpeg",
  WEBP: "webp",
} as const;

export const MEDIA_ALLOWED_EXTENSIONS = [
  MEDIA_EXTENSIONS.PNG,
  MEDIA_EXTENSIONS.JPG,
  MEDIA_EXTENSIONS.JPEG,
  MEDIA_EXTENSIONS.WEBP,
] as const;

export const MEDIA_ALLOWED_INPUT_ACCEPT = MEDIA_ALLOWED_EXTENSIONS.map(
  (ext) => `.${ext}`,
).join(",");

export const MEDIA_ALLOWED_EXTENSIONS_READABLE =
  MEDIA_ALLOWED_EXTENSIONS.join(", ");
