export type ApiClientOptions = {
  baseUrl: string;
};

export const createApiUrl = ({ baseUrl }: ApiClientOptions, path: string): string => {
  return new URL(path, baseUrl).toString();
};
