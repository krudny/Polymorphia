import { UseMutationResult } from "@tanstack/react-query";
import { ChangePasswordDTO } from "@/interfaces/api/user";
import {
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  ReactFormExtendedApi,
  useForm,
} from "@tanstack/react-form";
import { ZodObject, ZodString, ZodTypeAny } from "zod";

export interface UseChangePasswordProps {
  form: ReactFormExtendedApi<
    ChangePasswordDTO,
    FormValidateOrFn<ChangePasswordDTO> | undefined,
    FormValidateOrFn<ChangePasswordDTO> | undefined,
    FormAsyncValidateOrFn<ChangePasswordDTO> | undefined,
    ZodObject<
      { oldPassword: ZodString; newPassword: ZodString },
      "strip",
      ZodTypeAny,
      { oldPassword: string; newPassword: string },
      { oldPassword: string; newPassword: string }
    >,
    FormAsyncValidateOrFn<ChangePasswordDTO> | undefined,
    FormValidateOrFn<ChangePasswordDTO> | undefined,
    FormAsyncValidateOrFn<ChangePasswordDTO> | undefined,
    FormAsyncValidateOrFn<ChangePasswordDTO> | undefined,
    unknown
  >;
}

export interface UseChangePassword {
  mutation: UseMutationResult<void, Error, ChangePasswordDTO>;
}
