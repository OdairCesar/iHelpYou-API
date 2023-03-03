import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompanyServiceORM } from "./CompanyServiceORM";

@Entity('service_analysis')
export class ServiceAnalysisORM {
  
  @PrimaryGeneratedColumn()
  id: string
  
  @Column()
  amountAvgDay: number
  
  @Column()
  amountAvgWeek: number
  
  @Column()
  amountAvgMonth: number
  
  @Column()
  timeMdPerUser: string
  
  @Column()
  views: number
  
  @Column()
  purchaseCancelled: number

  @ManyToOne(type => CompanyServiceORM, serviceAnalyzesORM => ServiceAnalysisORM)
  companyService: CompanyServiceORM
}