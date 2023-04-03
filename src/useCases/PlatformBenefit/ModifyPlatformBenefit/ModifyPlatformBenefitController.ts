import { Request, Response } from "express";
import { IModifyPlatformBenefitRequestDTO } from "./ModifyPlatformBenefitDTO";
import { ModifyPlatformBenefitUseCase } from "./ModifyPlatformBenefitUseCase";

export class ModifyPlatformBenefitController {

  constructor(
    private modifyPlatformBenefitUseCase: ModifyPlatformBenefitUseCase
  ) { }

  async handle(request: Request, response: Response) {
    const { name, description, amount } = request.body
    const id = request.params.id

    if (!name && !description && !amount) {
      response.status(400).json({
        message: "Não foi informado qual a modificação"
      })
    }

    let dto: IModifyPlatformBenefitRequestDTO = { id }

    if (name && typeof name === "string") dto.name = name
    if (description && typeof description === "string") dto.description = description
    if (amount && typeof amount === "number") dto.amount = amount

    try{
      this.modifyPlatformBenefitUseCase.execute(dto)

      response.status(201).send()
    } catch (err) {
      response.status(400).json({
        message: err.message || "Unexpected error."
      })
    }
  }
}