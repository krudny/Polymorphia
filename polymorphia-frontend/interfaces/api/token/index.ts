export const TokenTypes = {
  INVITATION: "INVITATION",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
} as const;

export type TokenType = (typeof TokenTypes)[keyof typeof TokenTypes];

export interface TokenResult {
  type?: TokenType;
  token?: string;
}

export const TOKEN_PARAM_MAP: Record<TokenType, string> = {
  [TokenTypes.INVITATION]: "invitationToken",
  [TokenTypes.FORGOT_PASSWORD]: "forgotPasswordToken",
};
