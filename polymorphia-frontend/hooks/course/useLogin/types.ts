import { LoginDto } from "@/interfaces/api/login";
import {
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  ReactFormExtendedApi,
} from "@tanstack/react-form";
import { ZodObject, ZodString, ZodTypeAny } from "zod";
export interface UseLoginProps {
  form: ReactFormExtendedApi<
    LoginDto,
    FormValidateOrFn<LoginDto> | undefined,
    FormValidateOrFn<LoginDto> | undefined,
    FormAsyncValidateOrFn<LoginDto> | undefined,
    ZodObject<
      { email: ZodString; password: ZodString },
      "strip",
      ZodTypeAny,
      { email: string; password: string },
      { email: string; password: string }
    >,
    FormAsyncValidateOrFn<LoginDto> | undefined,
    FormValidateOrFn<LoginDto> | undefined,
    FormAsyncValidateOrFn<LoginDto> | undefined,
    FormAsyncValidateOrFn<LoginDto> | undefined,
    unknown
  >;
}
