import { IUser } from "src/interfaces"
import { UserRoles, AuthProvider, UserStatus } from "src/common/enum"
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm"

@Entity("users")
export class User implements IUser {

	// ===== Core =====
	@PrimaryGeneratedColumn("uuid")
	id: string

	// ===== Profile =====
	@Column({ type: "varchar", length: 255 })
	fullName: string

	@Column({ type: "text", nullable: true })
	avatarUrl?: string

	@Column({ type: "varchar", length: 30, nullable: true })
	phone?: string

	@Column({ type: "varchar", length: 10, nullable: true })
	locale?: string

	@Column({ type: "varchar", length: 50, nullable: true })
	timezone?: string

	// ===== Auth =====
	@Column({ type: "varchar", unique: true, nullable: true })
	email?: string

	@Column({ type: "text", nullable: true, select: false })
	password?: string

	@Column({
		type: "enum",
		enum: AuthProvider,
		default: AuthProvider.LOCAL,
	})
	authProvider: AuthProvider

	@Column({ type: "boolean", default: false })
	emailVerified: boolean

	// ===== Security =====
	@Column({ type: "timestamp", nullable: true })
	lastLoginAt?: Date

	@Column({ type: "varchar", length: 45, nullable: true })
	lastLoginIp?: string

	// ===== Access =====
	@Column({
		type: "enum",
		enum: UserRoles,
		default: UserRoles.USER,
	})
	role: UserRoles

	@Column({
		type: "enum",
		enum: UserStatus,
		default: UserStatus.ACTIVE,
	})
	status: UserStatus

	// ===== Audit =====
	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
