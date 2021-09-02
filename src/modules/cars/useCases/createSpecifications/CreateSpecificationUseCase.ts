import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository) {}
    execute({ name, description }: IRequest): void {
        const specificationAlreadExists = this.specificationsRepository.findByName(name)

        if (specificationAlreadExists) {
            throw new Error("Specification Alread Exists")
        }

        this.specificationsRepository.create({
            name,
            description
        })
    }
}
export { CreateSpecificationUseCase }