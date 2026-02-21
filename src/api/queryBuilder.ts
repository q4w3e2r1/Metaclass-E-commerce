import qs from "qs";

export const buildQuery = (params?: Record<string, unknown>) => {
  if (!params) return "";
  return qs.stringify(params, {
    encodeValuesOnly: true,
  });
};