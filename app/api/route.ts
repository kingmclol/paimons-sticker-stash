import { getApiSpec } from "@/lib/openapi";
import { ApiReference } from "@scalar/nextjs-api-reference";

const config = {
  content: getApiSpec(),
};

export const GET = ApiReference(config);
