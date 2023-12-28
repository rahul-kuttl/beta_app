export async function getCurrentTimeActivity(): Promise<number> {
  const today = new Date();
  return today.getTime();
}

export type TGetCurrentTimeActivity = typeof getCurrentTimeActivity;
