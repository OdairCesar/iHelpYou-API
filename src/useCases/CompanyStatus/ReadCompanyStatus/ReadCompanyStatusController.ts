import { Request, Response } from "express";
import { ReadCompanyStatusUseCase } from "./ReadCompanyStatusUseCase";
import { IReadCompanyStatusRequestDTO } from "./ReadCompanyStatusDTO";

export class ReadCompanyStatusController {
  constructor(private readCompanyStatusUseCase: ReadCompanyStatusUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id, paid, restriction, dateAdmission, activated, idPlan } = request.body;

    if (!id && !paid && !restriction && !dateAdmission && !activated && !idPlan) {
      return response.status(400).json({
        message: "Não a parametros para a busca",
      });
    }

    let dto: IReadCompanyStatusRequestDTO = {};

    if (id && typeof id === 'string') dto.id = id;
    if (paid && typeof paid === 'boolean') dto.paid = paid;
    if (restriction && typeof restriction === 'boolean') dto.restriction = restriction;
    if (activated && typeof activated === 'boolean') dto.activated = activated;
    if (idPlan && typeof idPlan === 'string') dto.idPlan = idPlan;
    
    if (dateAdmission) {
      if (dateAdmission instanceof Date) {
        dto.dateAdmission = dateAdmission;
      } else {
        dto.dateAdmission = new Date(dateAdmission);
      }
    }

    try {
      const companiesStatus = await this.readCompanyStatusUseCase.execute(dto);

      return response.status(201).json(companiesStatus);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
