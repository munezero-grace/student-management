export interface ServerInterface {
  port: number;
  prefix: string;
}

export const config: ServerInterface = {
  port: Number(process.env.PORT || 5500),
  prefix: String(process.env.PREFIX || "/api/v1"),
};
