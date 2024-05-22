import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('movies')
export class Movie {
    @PrimaryColumn({ type: 'uuid' })
    id: string

    @Column({ type: 'varchar', length: 255 })
    title: string

    @Column({ type: 'varchar', length: 4 })
    year: string

    @Column({ type: 'varchar', length: 50 })
    gender: string
}
