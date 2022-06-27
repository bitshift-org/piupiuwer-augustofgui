import ICreateUserDTO from "../dto/ICreateUserDTO";
import User from "../entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

class CreateUserService {
    constructor(private readonly usersRepository: IUsersRepository) {}

    public async execute({ username, email, password }: ICreateUserDTO): Promise<User> {
        const userEmailAlredyExists = await this.usersRepository.findUserByEmail( email );
        
        if(userEmailAlredyExists){
          throw new Error("Email address already used.");
        }

        const userUserNameAlredyExists = await this.usersRepository.findUserByUsername( username );
        
        if(userUserNameAlredyExists){
          throw new Error("Username already used.");
        }
    
        //const hashedPassword = await this.hashProvider.generateHash(password);
        
        const user = await this.usersRepository.create({
          username,
          email,
          password
        });
    
        return user;
      }
}

export default CreateUserService;