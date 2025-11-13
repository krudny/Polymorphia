import { useSearchParams } from "next/navigation";
import {
  TOKEN_PARAM_MAP,
  TokenResult,
  TokenType,
} from "@/interfaces/api/token";

export function useToken(): TokenResult {
  const searchParams = useSearchParams();

  for (const [tokenType, paramName] of Object.entries(TOKEN_PARAM_MAP)) {
    const tokenValue = searchParams.get(paramName);
    if (tokenValue) {
      return { type: tokenType as TokenType, token: tokenValue };
    }
  }

  return { type: undefined, token: undefined };
}
