import {
  //   generateComponents,
  generateUploadButton,
  generateUploadDropzone,
} from '@uploadthing/react';
import { generateReactHelpers } from '@uploadthing/react/hooks';

import type { OurFileRouter } from '@/app/api/uploadthing/core';

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const UploadButton = generateUploadButton<OurFileRouter>();

// export const { UploadButton, UploadDropzone, Uploader } =
//   generateComponents<OurFileRouter>();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
