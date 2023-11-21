export const loading = () => ({
  type: "LOADING",
});

export const success = (payload: any) => ({
  type: "SUCCESS",
  payload,
});

export const error = (error: Error) => ({
  type: "ERROR",
  error,
});
