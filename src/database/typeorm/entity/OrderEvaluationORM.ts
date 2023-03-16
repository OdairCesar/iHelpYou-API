import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ServiceORM } from "./ServiceORM"
import { UserORM } from "./UserORM"
import { OrderORM } from "./OrderORM"

@Entity('order_evalution')
export class OrderEvaluationORM {

  @PrimaryGeneratedColumn("uuid")
  id: string
  
  @Column()
  title: Date
  
  @Column()
  description: string
  
  @Column()
  amountStars: number
  
  @ManyToOne(type => UserORM, orderReviews => OrderEvaluationORM)
  idUser: UserORM
  
  @ManyToOne(type => OrderORM, orderReviews => OrderEvaluationORM)
  idOrder: OrderORM
  
  @ManyToOne(type => ServiceORM, orderReviews => OrderEvaluationORM)
  idService: ServiceORM
  
}