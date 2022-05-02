import { Response } from "express";


const ResponseWrapper = (res: Response , {
    data = null,
    message = '요청을 성공적으로 실행했습니다.',
    status = 200    
}) => {
    return res.status(status).json({
        status,
        message,
        data
    });
}

export default ResponseWrapper;