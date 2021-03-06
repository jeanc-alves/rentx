import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a catergory", async () => {
    const category = {
      name: "Category Test1",
      description: "Category Desc",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });
  it("Should not be able to create a catergory with name exists", async () => {
    const category = {
      name: "Category Test",
      description: "Category Desc",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });
    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("Category Already Exists"));
  });
});
