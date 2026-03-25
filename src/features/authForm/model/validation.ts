import { z } from "zod";

export const authFormSchema = z.object({
  username: z.string().min(3, "Минимум 3 символа"),
  loginCode: z.string().min(1, "Введите код"),
});

export type AuthFormData = z.infer<typeof authFormSchema>;