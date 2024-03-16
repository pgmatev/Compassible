import { rejects } from "assert";
import { User } from "../../src/models/user";
import { BcryptService } from "../../src/services/bcrypt-sercive";
import { EmailAlreadyExistsError, UsernameAlreadyExistsError, UserService } from "../../src/services/user-service"
import { createUser } from "../support/factories";

describe('UserService', () => {
    describe('register', () => {
        it('inserts new user into the db', async () => {
            const userService = new UserService();
            await createUser({username: "dani", email:"dani@com.com"})
            await userService.register({
                username: "pgmatev",
                email: "pg@matev.com",
                password: "7777",
                name: "Marтин"
            })

            const user = await User.query().findOne({username: "pgmatev"})

            expect(user!.email).toEqual("pg@matev.com");
            expect(user!.password).not.toEqual("7777");
        })

        it('throws an error when username already exists', async () => {
            const userService = new UserService();
            await createUser({ username: "pgmatev" });

            await expect(async () => {
                await userService.register({
                    username: "pgmatev",
                    email: "pg@matev.com",
                    password: "7777",
                    name: "Marтин"
            })}).rejects.toThrow(UsernameAlreadyExistsError);
        })

        it('throws an error when email already exists', async () => {
            const userService = new UserService();
            await createUser({ email: "pg@matev.com" });

            await expect(async () => {
                await userService.register({
                    username: "pgmatev1",
                    email: "pg@matev.com",
                    password: "7777",
                    name: "Marтин"
            })}).rejects.toThrow(EmailAlreadyExistsError);
        })
    })

    describe("login", () => {
        it('fetches the correct user', async () => {
            const userService = new UserService();
            const bcryptService = new BcryptService();
            await createUser({ username: "pgmatev", password: await bcryptService.hash("7777"), email: "pg@matev.com"});

            const user = await userService.login("pgmatev", "7777");

            expect(user?.email).toEqual("pg@matev.com");
        })

        it('returns undefined if the username is not found', async () => {
            const userService = new UserService();
            const bcryptService = new BcryptService();
            await createUser({ username: "pgmatev", password: await bcryptService.hash("7777"), email: "pg@matev.com"});

            const user = await userService.login("pgmatev1", "7777");

            expect(user).toEqual(undefined);
        })

        it('returns undefined if the password is wrong', async () => {
            const userService = new UserService();
            const bcryptService = new BcryptService();
            await createUser({ username: "pgmatev", password: await bcryptService.hash("7777"), email: "pg@matev.com"});

            const user = await userService.login("pgmatev", "1234");

            expect(user).toEqual(undefined);
        })
    })

    describe("updateUserById", () => {
        it("updates the user in the database", async () => {
            const userService = new UserService();
            const bcryptService = new BcryptService();
            const user = await createUser({ username: "pgmatev", password: await bcryptService.hash("7777"), email: "pg@matev.com"});

            const result = await userService.updateUserById(user.id, { username: "notpgmatev"});

            expect(result).toEqual(1) //numbers of updated rows

            const updatedUser = await User.query().findById(user.id);

            expect(updatedUser!.username).toEqual("notpgmatev");
            expect(updatedUser!.email).toEqual("pg@matev.com");

        })

        it("hashes the password if its included in the update", async () => {
            const userService = new UserService();
            const bcryptService = new BcryptService();
            const user = await createUser({ password: await bcryptService.hash("7777") });

            await userService.updateUserById(user.id, { password: "1234" });

            const updatedUser = await User.query().findById(user.id);

            const passwordMatch = await bcryptService.compare("1234", updatedUser!.password);

            expect(passwordMatch).toEqual(true);
        })

        it("throws EmailAlreadyExistsError if email already exists", async () => {
            const userService = new UserService();
            const user = await createUser({ email: "pg@matev.com", username: "pg" });
            const user2 = await createUser({ email: "nasko@abv.bg", username: "nasko" });

            await expect(async () => {
                await userService.updateUserById(user.id, { email: "nasko@abv.bg" })
            }).rejects.toThrow(EmailAlreadyExistsError)
        })

        it("throws UsernameAlreadyExistsError if username already exists", async () => {
            const userService = new UserService();
            const user = await createUser({ email: "pg@matev.com", username: "pg" });
            const user2 = await createUser({ email: "nasko@abv.bg", username: "nasko" });

            await expect(async () => {
                await userService.updateUserById(user.id, { username: "nasko" })
            }).rejects.toThrow(UsernameAlreadyExistsError)
        })

        it("throws any other error that occurs during db update", async () => { //not working :(
            const userService = new UserService();
            const user = await createUser({ username: "vanko" });

            await expect(async () => {
                await userService.updateUserById(user.id, { username: undefined })
            }).rejects.toThrowError() //it resolves intead of rejecting :(
        })
    })
})