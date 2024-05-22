import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryColumn({ type: 'uuid' })
    id: string

    @Column({ type: 'varchar', length: 255 })
    username: string

    @Column({ type: 'varchar', length: 255 })
    password: string
}