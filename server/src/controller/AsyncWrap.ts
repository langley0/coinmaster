import { Request, Response, NextFunction }  from "express";

type AsyncWrapperHandler = (req: Request, res: Response) => Promise<void>;

function AsyncWrap(handler: AsyncWrapperHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
        handler(req, res).catch((e) => {
            next(e);
        });
    };
}

export default AsyncWrap;