import { z } from 'zod'

export const settingsSchema = z.object({
  startOnLogin: z.boolean().default(false),
  ignoreClipboard: z.boolean().default(false),
  computeTechnology: z
    .enum(['auto', 'cpu', 'cuda', 'vulkan', 'metal'])
    .default('auto'),
})

export const userSchema = z.object({
  name: z.string().optional(),
})

export type TUserSchema = z.infer<typeof userSchema>
export type TSettingsSchema = z.infer<typeof settingsSchema>