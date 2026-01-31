import { UserRoles } from "src/common/enum"
import { AuthProvider, UserStatus } from "src/common/enum"

export interface IUser {
	// ===== Core =====
	id: string

	// ===== Profile =====
	fullName: string
	avatarUrl?: string
	phone?: string
	locale?: string        // uz, en, ru
	timezone?: string      // Asia/Tashkent

	// ===== Auth =====
	email?: string
	password?: string      // faqat LOCAL auth uchun
	authProvider: AuthProvider
	emailVerified: boolean

	// ===== Security =====
	lastLoginAt?: Date
	lastLoginIp?: string

	// ===== Access =====
	role: UserRoles
	status: UserStatus

	// ===== Audit =====
	createdAt: Date
	updatedAt: Date
}
