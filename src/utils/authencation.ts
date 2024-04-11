import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const authToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader: string | undefined =
            req.headers.authorization
        const token: string = authorizationHeader
            ? authorizationHeader.split(' ')[1]
            : ''
        console.log(jwt.verify(
          token,
          process.env.TOKEN_SECRET as string
          ))
        res.locals.userData = jwt.verify(
            token,
            process.env.TOKEN_SECRET as string
        )
        next()
    } catch (err) {
        // @ts-ignore
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
}

export default authToken
