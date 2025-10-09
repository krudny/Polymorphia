import { LoginDTO } from "@/interfaces/api/login";
import {
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  ReactFormExtendedApi,
} from "@tanstack/react-form";
import { ZodObject, ZodString, ZodTypeAny } from "zod";
export interface UseLoginProps {
  form: ReactFormExtendedApi<
    LoginDTO,
    FormValidateOrFn<LoginDTO> | undefined,
    FormValidateOrFn<LoginDTO> | undefined,
    FormAsyncValidateOrFn<LoginDTO> | undefined,
    ZodObject<
      { email: ZodString; password: ZodString },
      "strip",
      ZodTypeAny,
      { email: string; password: string },
      { email: string; password: string }
    >,
    FormAsyncValidateOrFn<LoginDTO> | undefined,
    FormValidateOrFn<LoginDTO> | undefined,
    FormAsyncValidateOrFn<LoginDTO> | undefined,
    FormAsyncValidateOrFn<LoginDTO> | undefined,
    unknown
  >;
}
