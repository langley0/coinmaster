import { Request, Response }  from "express";

export default async function(req: Request, res: Response) {
    // req.body.username 을 이용해서 사용자를 얻어온다
    // 해당 사용자를 위한 토큰을 발행하고 플레이어 아이디를 연결한다
    res.status(500).send();

}