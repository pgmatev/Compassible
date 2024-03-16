import { Router } from "express"
import { MovieService, MovieInputSchema, MovieAlreadyExistsError } from "../services/movie-service"
import { authMiddleware, getUserFromLocals } from "../middlewares/auth";
import { requestHandler } from "../middlewares/request-handler";
import { BadRequestError, NotFoundError } from "../errors";
import { UserTransformer } from "../transformers/user-transformer";

const movieRouter = Router();
const movieService = new MovieService();
const userTransformer = new UserTransformer();

movieRouter.get('/', requestHandler(async (req, res) => {
    const {page, size} = req.query;
    const pageNumber = Number(page);
    const sizeNumber = Number(size);  

    if (Number.isNaN(pageNumber) || Number.isNaN(sizeNumber)) {
        throw new BadRequestError("Page and Size should be numbers");
    }
    
    const movies = await movieService.getMoviesBasedOnLikes(pageNumber, sizeNumber);
    res.status(200).send({ movies });
}))

movieRouter.post('/', authMiddleware , (async (req, res) => {
    const movieInput = MovieInputSchema.parse(req.body);
    try {
    const movie = await movieService.insertMovie(movieInput);
    res.status(201).send({ movie });
    } catch (error)
    {
        if (error instanceof MovieAlreadyExistsError) {
            throw new BadRequestError("Movie already exists!");
        }
    }

}))

movieRouter.get('/:id', requestHandler(async (req, res) => {
    const { id } = req.params;
    const idNumber = Number(id);
    if (Number.isNaN(idNumber)) {
        throw new BadRequestError("Id should be a number");
    }

    const movie = await movieService.getMovieById(idNumber);
    if (!movie) {
        throw new NotFoundError("Movie not found");
    }

    res.status(200).send({ movie });
}))

movieRouter.delete('/:id', authMiddleware, requestHandler(async (req, res) => {
    const { id } = req.params;
    const idNumber = Number(id);
    if (Number.isNaN(idNumber)) {
        throw new BadRequestError("Id should be a number");
    }

    await movieService.deleteMovieById(idNumber);
    res.status(200).send({message: "succesful delete"});
}))

movieRouter.patch('/:id', authMiddleware, requestHandler(async (req, res) => {
    const { id } = req.params;
    const idNumber = Number(id);
    if (Number.isNaN(idNumber)) {
        throw new BadRequestError("Id should be a number");
    }

    const movieInput = MovieInputSchema.parse(req.body);
    const updatedMovie = await movieService.updateMovieById(idNumber, movieInput);
    res.status(200).send({updatedMovie});
}))

movieRouter.get('/:id/likes', requestHandler(async (req, res) => {
    const { id } = req.params; //should i make a whole z.object just for one param? 
    const idNumber = Number(id);
    if (Number.isNaN(idNumber)) {
        throw new BadRequestError("Id should be a number");
    }
    const movie = await movieService.getMovieWithLikes(idNumber);

    if (!movie) {
        throw new NotFoundError("Movie not found");
    }

    res.status(200).send({likes: movie.likedBy?.map(user => userTransformer.transform(user))});

}))

movieRouter.post('/:id/likes', authMiddleware, requestHandler(async (req, res) => {
    const { id } = req.params; //should i make a whole z.object just for one param? 
    const movieIdNumber = Number(id);

    if (Number.isNaN(movieIdNumber)) {
        throw new BadRequestError("Id should be a number");
    }

    const user = getUserFromLocals(res);

    const movie = await movieService.likeMovie(movieIdNumber, user);

    if (!movie) {
        throw new NotFoundError("Movie not found");
    }

    res.status(200).send({movie});

}))

export { movieRouter };