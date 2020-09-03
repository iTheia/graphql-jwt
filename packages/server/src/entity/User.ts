import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectID;

	@Field()
	@Column()
	userName: string;

	@Field()
	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column('int', { default: 0 })
	tokenVersion: number;

	@Column('string', { nullable: true, default: null })
	role: string;
}
