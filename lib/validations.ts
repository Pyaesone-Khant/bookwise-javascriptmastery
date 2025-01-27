import { z } from 'zod'

export const SignupSchema = z.object({
    fullName: z.string().min(3, 'Name is too short').max(255, 'Name is too long'),
    email: z.string().email('Invalid email address'),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty('University card is required'),
    password: z.string().min(8, 'Password is too short').max(255, 'Password is too long'),
})

export const SigninSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password is too short')
})